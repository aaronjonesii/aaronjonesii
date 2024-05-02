import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {
  Auth, User, GoogleAuthProvider, IdTokenResult,
  UserCredential, AuthError, ActionCodeSettings,
  authState, createUserWithEmailAndPassword,
  deleteUser, sendEmailVerification, signInAnonymously,
  signInWithEmailAndPassword, signInWithPopup, signOut,
  sendPasswordResetEmail, updateEmail, getIdTokenResult,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ConsoleLoggerService } from './console-logger.service';
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '../interfaces/functions';
import { FunctionsService } from './functions.service';
import { FunctionsError } from '@angular/fire/functions';
import { UserWithID } from '../interfaces/user';
import { navPath } from '../../app.routes';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  user$: Observable<User|null> = this.loadUser;
  private idTokenResultPromise: Promise<IdTokenResult> | null = null;
  private subscriptions = new Subscription();

  constructor(
    private auth: Auth,
    private router: Router,
    private fn: FunctionsService,
    private logger: ConsoleLoggerService,
  ) {
    this.subscriptions.add(
      this.user$.subscribe((user) => {
        return this.idTokenResultPromise = user === null ?
          null : this.loadUserToken(user);
      }),
    );
  }

  /**
   * Creates an Observable of authentication state changes.
   * It emits only on sign-in or sign-out events.
   *
   * @return {User | null}
   */
  get loadUser(): Observable<User | null> {
    return authState(this.auth);
  }

  /**
   * Gets a valid ID Token for the user.
   * Refreshes the token if necessary before returning.
   *
   * @remarks
   * Returns the current token if it has not expired or if it will not
   * expire in the next five minutes. Otherwise, this will refresh the token
   * and return a new one.
   *
   * @param {User} user - The Firebase User to get the ID Token for.
   * @param {boolean} forceRefresh - Forces a refresh even if the current
   * token is valid.
   * @return {Promise<IdTokenResult>} A Promise resolving with the current
   * or refreshed ID Token.
   *
   */
  loadUserToken(user: User, forceRefresh?: boolean): Promise<IdTokenResult> {
    return getIdTokenResult(user, forceRefresh);
  }

  /**
   * Checks if the provided user has the 'admin' claim in their ID Token.
   *
   * @param {User | null} user - The Firebase User to check, or null if a
   * user is not signed in.
   * @return {Promise<boolean>} A Promise resolving to true if the user has
   * the 'admin' claim, false otherwise.
   */
  async isAdmin(user: User | null): Promise<boolean> {
    return user === null ?
      false : (await user.getIdTokenResult()).claims['admin'] == true;
  }

  /**
   * Signs the user in anonymously.
   *
   * @remarks
   * If there is already an anonymous user signed in, that user will be
   * returned; otherwise, a new anonymous user identity will be created
   * and returned.
   *
   * @return {Promise<UserCredential | AuthError>} A Promise that resolves
   * with UserCredential upon success, or an AuthError on failure.
   */
  async loginAnonymously(): Promise<UserCredential | AuthError> {
    return await signInAnonymously(this.auth)
      .then((userCredential) => {
        this.routeRedirect();
        return userCredential;
      }).catch((error: AuthError) => {
        this.logger.error(
          `Something went wrong signing in anonymously`,
          [error, this.auth],
        );
        return error;
      });
  }

  /**
   * Signs the user in with Google authentication using a pop-up.
   *
   * @remarks
   * If succeeds, returns the signed in user along with the provider's
   * credential. If sign in was unsuccessful, returns an error object
   * containing additional information about the error.
   *
   * @return {Promise<UserCredential | AuthError>} A Promise that resolves
   * with UserCredential upon success, or an AuthError on failure.
   */
  async googleLogin(): Promise<UserCredential | AuthError> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider)
      .then((newCredential) => {
        const nameOrEmail = this._displayNameOrEmail(newCredential);
        this.logger.log(`Welcome back ${nameOrEmail}`);
        this.routeRedirect();
        return newCredential;
      })
      .catch((error: AuthError) => {
        this.logger.error(
          `Something went wrong signing in with Google`,
          [error, this.auth, provider],
        );
        return error;
      });
  }

  /**
   * Signs the current user out.
   *
   * @return {Promise<void | AuthError>} A Promise that resolves on
   * successful sign out, or rejects with an AuthError on failure.
   */
  async logout(): Promise<void | AuthError> {
    await signOut(this.auth)
      .then(() => {
        this.logger.info(`Signed out`);
        this.router.navigate([navPath.home]);
      })
      .catch((error: AuthError) => {
        this.logger.error(
          `Something went wrong signing out`,
          [error, this.auth],
        );
        return error;
      });
  }

  /**
   * Deletes the user account. Requires recent re-authentication.
   *
   * @remarks
   * Important: this is a security-sensitive operation that requires the user
   * to have recently signed in. If this requirement isn't met, ask the user
   * to authenticate again and then call {@link reauthenticateWithCredential}.
   *
   * @param {User} user - The Firebase User to delete.
   * @return {Promise<void | AuthError>} A Promise that resolves on
   * successful account deletion, or rejects with an AuthError on failure
   */
  async delete(user: User): Promise<void | AuthError> {
    return deleteUser(user)
      .then(() => {
        this.logger.info(`Account deleted`);
        this.router.navigate([navPath.home]);
      }).catch((error: AuthError) => {
        this.logger.error(
          `Error deleting account, please reauthenticate and try again`,
          [error, user],
        );
        return error;
      });
  }

  /**
   * Creates a new user account with email and password, and immediately
   * signs them in.
   *
   * @remarks
   * On successful creation of the user account, this user will also be signed
   * in to your application.
   *
   * User account creation can fail if the account already exists or the
   * password is invalid.
   *
   * Note: The email address acts as a unique identifier for the user and
   * enables an email-based password reset. This function will create a new
   * user account and set the initial user password.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's chosen password.
   * @return {Promise<UserCredential | AuthError>} A Promise that resolves
   * with UserCredential upon success, or an AuthError on failure.
   */
  async signUp(
    email: string,
    password: string,
  ): Promise<UserCredential | AuthError> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.sendVerificationEmail(userCredential.user);
        this.routeRedirect();
        return userCredential;
      }).catch((error: AuthError) => {
        if (error.code == 'auth/email-already-exists') {
          this.logger.error(
            // eslint-disable-next-line max-len
            `The provided email is already in use by an existing user. Change the email address and try again.`,
            [error, email, password],
          );
          return error;
        }

        this.logger.error(
          `Something went wrong creating account`,
          [error, email, password],
        );
        return error;
      });
  }

  /**
   * Signs the user in with email and password.
   *
   * @remarks
   * Fails with an error if the email address and password do not match.
   *
   * Note: The user's password is NOT the password used to access the user's
   * email account. The email address serves as a unique identifier for the
   * user, and the password is used to access the user's account in your
   * Firebase project. See also: {@link signUp}.
   *
   * @param {string} email - The users email address.
   * @param {string} password - The users password.
   * @return {Promise<UserCredential | AuthError>} A Promise that resolves
   * with UserCredential upon success, or an AuthError on failure.
   */
  async signIn(
    email: string,
    password: string,
  ): Promise<UserCredential | AuthError> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const nameOrEmail = this._displayNameOrEmail(userCredential);
        this.logger.log(`Welcome back ${nameOrEmail}`);
        this.routeRedirect();
        return userCredential;
      }).catch((error: AuthError) => {
        this.logger.error(
          `Something went wrong signing in`,
          [error, email, password],
        );
        return error;
      });
  }

  /**
   * Sends a verification email to the provided user.
   *
   * @remarks
   * The verification process is completed by calling {@link applyActionCode}.
   *
   * @param {User} user - The Firebase User to send the verification email to.
   * @param {ActionCodeSettings} actionCodeSettings - (Optional) Settings to
   * configure the verification email
   * (e.g., URL for redirect after verification)
   * @return {Promise<void | AuthError>} A Promise that resolves on
   * successful email send, or rejects with an AuthError on failure.
   */
  async sendVerificationEmail(
    user: User,
    actionCodeSettings?: ActionCodeSettings | null,
  ): Promise<void | AuthError> {
    return sendEmailVerification(user, actionCodeSettings)
      .then(() => this.logger.log(`Verification email has been sent`))
      .catch((error) => {
        this.logger.error(
          `Something went wrong sending verification email`,
          [error, user, actionCodeSettings],
        );
        return error;
      });
  }

  /**
   * Updates the user's email address. Requires recent re-authentication.
   *
   * @remarks
   * An email will be sent to the original email address (if it was set) that
   * allows to revoke the email address change, in order to protect them
   * from account hijacking.
   *
   * Important: this is a security sensitive operation that requires the user
   * to have recently signed in. If this requirement isn't met, ask the user
   * to authenticate again and then call {@link reauthenticateWithCredential}.
   *
   * @param {User} user - The Firebase User to update the email for.
   * @param {string} newEmail - The new email address to set.
   * @return {Promise<void | AuthError>} A Promise that resolves on
   * successful email update, or rejects with an AuthError on failure.
   */
  async changeEmail(user: User, newEmail: string): Promise<void | AuthError> {
    return updateEmail(user, newEmail)
      .then(() => this.logger.log(`Changed email address`))
      .catch((error: AuthError) => {
        this.logger.error(
          `Something went wrong changing email`,
          [error, user, newEmail],
        );
        return error;
    });
  }

  /**
   * Sends a password reset email to the provided email address.
   *
   * @remarks
   * To complete the password reset, call {@link confirmPasswordReset} with
   * the code supplied in the email sent to the user, along with the new
   * password specified by the user.
   *
   * @param {string} email The user's email address.
   * @param {ActionCodeSettings} actionCodeSettings (Optional) Settings to
   * configure the password reset email
   * (e.g., URL for redirect after password reset)
   * @return {Promise<void | AuthError>} A Promise that resolves on
   * successful email send, or rejects with an AuthError on failure.
   */
  async sendPasswordResetEmail(
    email: string,
    actionCodeSettings?: ActionCodeSettings,
  ): Promise<void | AuthError> {
    return sendPasswordResetEmail(this.auth, email, actionCodeSettings)
      .then(() => this.logger.log(`Password reset email sent`))
      .catch((error: AuthError) => {
        this.logger.error(
          `Something went wrong sending password reset email`,
          [error, email, actionCodeSettings],
        );
        return error;
      });
  }

  /**
   * Updates the current user's profile (display name and photo).
   * This calls a Firebase Cloud Function.
   *
   * @param {UpdateProfileRequest} updateUserData An object containing the
   * new display name and/or profile photo URL.
   * @return {Promise<UpdateProfileResponse | FunctionsError>} A Promise that
   * resolves with the response from the Cloud Function, or a FunctionsError
   * on failure.
   */
  async updateUser(
    updateUserData: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse | FunctionsError> {
    return this.fn.httpsCallable<UpdateProfileRequest, UpdateProfileResponse>(
      'user-update', updateUserData,
    ).then((res) => {
        res = <UpdateProfileResponse>res;
        /** reload user auth state */
        if (res.ok && res.user) this.user$ = this.loadUser;

        this.logger.log(res.message);
        return res;
      })
      .catch((error: FunctionsError) => {
        this.logger.error(
          `Something went wrong updating user`,
          [error, updateUserData],
        );
        return error;
      });
  }

  /**
   * Redirects the user to a previous page (if stored) or to the home page.
   * Used after sign-in or sign-up.
   */
  private routeRedirect() {
    const state = this.router.routerState;
    const snapshot = state.snapshot;

    const routeParams = snapshot.root.queryParams;
    const route = routeParams['redirectURL'] ?? navPath.home;
    const fragment = snapshot.root.fragment ?? undefined;
    this.router.navigate([route], { fragment });
  }

  /**
   * Checks if a user is signed in. Used in page guards to redirect to home
   * if signed in, or a sign-in page if not.
   *
   * @param {string} urlToCheck - The URL of the page requiring sign-in.
   * @param {number} timeout - (Optional) Time to wait before redirecting
   * (defaults to 5000ms)
   */
  checkIfSignedIn(urlToCheck: string, timeout: number = 5000) {
    /** check if user is already signed in */
    this.loadUser.forEach((user) => {
      if (user) {
        /** wait 5 seconds */
        setTimeout(() => {
          const redirectURL = this.router.routerState.snapshot
            .root.queryParams['redirectURL'];
          const fragment = this.router.routerState.snapshot
            .root.fragment ?? undefined;
          /** redirect to URL if present */
          if (redirectURL) this.router.navigate([redirectURL], { fragment });
          /** else redirect to home if signed in and still on sign in page */
          else {
            if (this.router.routerState.snapshot.url === urlToCheck) {
              this.router.navigate([navPath.home]);
            }
          }
        }, timeout);
      }
    });
  }

  /**
   * Asserts that the current user is signed in and has a user ID for routes
   * requiring it. Throws an error and navigates to the sign-in page if the
   * user is not signed in.
   *
   * @param {UserWithID | User | null} user - The user to check
   */
  assertUser(user: UserWithID | User | null): asserts user {
    if (!user) {
      this.router.navigate(
        [navPath.signIn],
        {
          queryParams: { 'redirectURL': this.router.routerState.snapshot.url },
        },
      );
      throw new Error(`You must be signed in`);
    }
  }

  private _displayNameOrEmail(userCredential: UserCredential) {
    return userCredential.user.displayName ?? userCredential.user.email;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
