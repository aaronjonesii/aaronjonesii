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
import { UpdateProfileResponse } from '../interfaces/functions';
import { FunctionsService } from './functions.service';
import { FunctionsError } from "@angular/fire/functions";
import { UserWithID } from "../interfaces/user";
import { nav_path } from "../../app.routes";

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
        return this.idTokenResultPromise = user == null ? null : this.loadUserToken(user);
      }),
    );
  }

  /**
   * Create an observable of authentication state. The observer is only
   * triggered on sign-in or sign-out.
   *
   * @public
   */
  get loadUser(): Observable<User | null> {
    return authState(this.auth);
  }

  /**
   * Returns a deserialized JSON Web Token (JWT) used to identitfy the user to a Firebase service.
   *
   * @remarks
   * Returns the current token if it has not expired or if it will not expire in the next five
   * minutes. Otherwise, this will refresh the token and return a new one.
   *
   * @param user - The user.
   * @param forceRefresh - Force refresh regardless of token expiration.
   *
   * @public
   */
  loadUserToken(user: User, forceRefresh?: boolean): Promise<IdTokenResult> {
    return getIdTokenResult(user, forceRefresh);
  }

  /**
   * Create a promise to return boolean of whether the provided user has an admin role in their user claims
   *
   * @public
   */
  async isAdmin(user: User | null): Promise<boolean> {
    return user == null ? false : (await user.getIdTokenResult()).claims['admin'] == true;
  }

  /**
   * Asynchronously signs in as an anonymous user.
   *
   * @remarks
   * If there is already an anonymous user signed in, that user will be returned; otherwise, a
   * new anonymous user identity will be created and returned.
   *
   * @public
   */
  async loginAnonymously(): Promise<UserCredential | AuthError> {
    return await signInAnonymously(this.auth)
      .then(userCredential => {
        this.routeRedirect();
        return userCredential;
      }).catch((error: AuthError) => {
        this.logger.error(`Something went wrong signing in anonymously`, [error, this.auth]);
        return error;
      });
  }

  /**
   * Authenticates a Firebase client using a popup-based OAuth authentication flow.
   *
   * @remarks
   * If succeeds, returns the signed in user along with the provider's credential. If sign in was
   * unsuccessful, returns an error object containing additional information about the error.
   *
   * @public
   */
  async googleLogin(): Promise<UserCredential | AuthError> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider)
      .then(newCredential => {
        this.logger.log(`Welcome back ${this._displayNameOrEmail(newCredential)}`);
        this.routeRedirect();
        return newCredential;
      })
      .catch((error: AuthError) => {
        this.logger.error(`Something went wrong signing in with Google`, [error, this.auth, provider]);
        return error;
      });
  }

  /**
   * Signs out the current user.
   *
   * @public
   */
  async logout(): Promise<void | AuthError> {
    await signOut(this.auth)
      .then(() => {
        this.logger.info(`Signed out`);
        this.router.navigate([nav_path.home]);
      })
      .catch((error: AuthError) => {
        this.logger.error(`Something went wrong signing out`, [error, this.auth]);
        return error;
      });
  }

  /**
   * Deletes and signs out the user.
   *
   * @remarks
   * Important: this is a security-sensitive operation that requires the user to have recently
   * signed in. If this requirement isn't met, ask the user to authenticate again and then call
   * {@link reauthenticateWithCredential}.
   *
   * @param user - The {@link User} instance.
   *
   * @public
   */
  async delete(user: User): Promise<void | AuthError> {
    return deleteUser(user)
      .then(() => {
        this.logger.info(`Account deleted`);
        this.router.navigate([nav_path.home]);
      }).catch((error: AuthError) => {
        this.logger.error(`Something went wrong deleting account, please reauthenticate and try again`, [error, user]);
        return error;
      });
  }

  /**
   * Creates a new user account associated with the specified email address and password.
   *
   * @remarks
   * On successful creation of the user account, this user will also be signed in to your application.
   *
   * User account creation can fail if the account already exists or the password is invalid.
   *
   * Note: The email address acts as a unique identifier for the user and enables an email-based
   * password reset. This function will create a new user account and set the initial user password.
   *
   * @param email - The user's email address.
   * @param password - The user's chosen password.
   *
   * @public
   */
  async signUp(email: string, password: string): Promise<UserCredential | AuthError> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        this.sendVerificationEmail(userCredential.user);
        this.routeRedirect();
        return userCredential;
      }).catch((error: AuthError) => {
        if (error.code == 'auth/email-already-exists') {
          this.logger.error(`The provided email is already in use by an existing user. Change the email address and try again.`, [error, email, password])
          return error;
        }

        this.logger.error(`Something went wrong creating account`, [error, email, password]);
        return error;
      });
  }

  /**
   * Asynchronously signs in using an email and password.
   *
   * @remarks
   * Fails with an error if the email address and password do not match.
   *
   * Note: The user's password is NOT the password used to access the user's email account. The
   * email address serves as a unique identifier for the user, and the password is used to access
   * the user's account in your Firebase project. See also: {@link signUp}.
   *
   * @param email - The users email address.
   * @param password - The users password.
   *
   * @public
   */
  async signIn(email: string, password: string): Promise<UserCredential | AuthError> {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.logger.log(`Welcome back ${this._displayNameOrEmail(userCredential)}`);
        this.routeRedirect();
        return userCredential;
      }).catch((error: AuthError) => {
        this.logger.error(`Something went wrong signing in`, [error, email, password]);
        return error;
      });
  }

  /**
   * Sends a verification email to a user.
   *
   * @remarks
   * The verification process is completed by calling {@link applyActionCode}.
   *
   * @param user - The user.
   * @param actionCodeSettings - The {@link ActionCodeSettings}.
   *
   * @public
   */
  async sendVerificationEmail(user: User, actionCodeSettings?: ActionCodeSettings | null): Promise<void | AuthError> {
    return sendEmailVerification(user, actionCodeSettings)
      .then(() => this.logger.log(`Verification email has been sent`))
      .catch(error => {
        this.logger.error(`Something went wrong sending verification email`, [error, user, actionCodeSettings])
        return error;
      });
  }

  /**
   * Updates the user's email address.
   *
   * @remarks
   * An email will be sent to the original email address (if it was set) that allows to revoke the
   * email address change, in order to protect them from account hijacking.
   *
   * Important: this is a security sensitive operation that requires the user to have recently signed
   * in. If this requirement isn't met, ask the user to authenticate again and then call
   * {@link reauthenticateWithCredential}.
   *
   * @param user - The user.
   * @param newEmail - The new email address.
   *
   * @public
   */
  async changeEmail(user: User, newEmail: string): Promise<void | AuthError> {
    return updateEmail(user, newEmail)
      .then(() => this.logger.log(`Changed email address`))
      .catch((error: AuthError) => {
        this.logger.error(`Something went wrong changing email`, [error, user, newEmail]);
        return error;
    });
  }

  /**
   * Sends a password reset email to the given email address.
   *
   * @remarks
   * To complete the password reset, call {@link confirmPasswordReset} with the code supplied in
   * the email sent to the user, along with the new password specified by the user.
   *
   * @param email - The user's email address.
   * @param actionCodeSettings - The {@link ActionCodeSettings}.
   *
   * @public
   */
  async sendPasswordResetEmail(email: string, actionCodeSettings?: ActionCodeSettings): Promise<void | AuthError> {
    return sendPasswordResetEmail(this.auth, email, actionCodeSettings)
      .then(() => this.logger.log(`Password reset email sent`))
      .catch((error: AuthError) => {
        this.logger.error(`Something went wrong sending password reset email`, [error, email, actionCodeSettings]);
        return error;
      });
  }

  /**
   * Update the users profile.
   *
   * @param updateUserData - The user's display name and URL link for the user's profile picture.
   *
   * @public
   */
  async updateUser(
    updateUserData: {
      displayName?: string | null,
      photoURL?: string | null,
    }): Promise<UpdateProfileResponse | FunctionsError> {
    return this.fn.httpsCallable<UpdateProfileResponse>('user-update', updateUserData)
      .then((res) => {
        res = <UpdateProfileResponse>res;
        if (res.ok && res.user) this.user$ = this.loadUser; // reload user auth state

        this.logger.log(res.message);
        return res;
      })
      .catch((error: FunctionsError) => {
        this.logger.error(`Something went wrong updating user`, [error, updateUserData]);
        return error;
      });
  }

  /**
   * Redirect the user to previous page if any.
   *
   * @private
   */
  private routeRedirect() {
    const state = this.router.routerState;
    const snapshot = state.snapshot;

    const routeParams = snapshot.root.queryParams;
    const route = routeParams['redirectURL'] ?? nav_path.home;
    const fragment = snapshot.root.fragment ?? undefined;
    this.router.navigate([route], { fragment });
  }

  checkIfSignedIn(urlToCheck: string, timeout = 5000) {
    /** check if user is already signed in */
    this.loadUser.forEach(user => {
      if (user) {
        /** wait 5 seconds */
        setTimeout(() => {
          const redirectURL = this.router.routerState.snapshot.root.queryParams['redirectURL'];
          const fragment = this.router.routerState.snapshot.root.fragment ?? undefined;
          /** redirect to URL if present */
          if (redirectURL) this.router.navigate([redirectURL], {fragment});
          /** else redirect to home if signed in and still on sign in page */
          else if (this.router.routerState.snapshot.url === urlToCheck) this.router.navigate([nav_path.home])
        }, timeout);
      }
    });
  }

  assertUser(user: UserWithID | User | null): asserts user {
    if (!user) {
      this.router.navigate([nav_path.signIn], { queryParams: { "redirectURL": this.router.routerState.snapshot.url } });
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
