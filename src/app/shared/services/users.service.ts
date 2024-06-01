import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { readUser, User, UserWithID } from '../interfaces/user';
import { User as FirebaseUser } from '@angular/fire/auth';
import { ConsoleLoggerService } from './console-logger.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly collectionName = 'users';

  constructor(
    private db: FirestoreService,
    private logger: ConsoleLoggerService,
  ) {}

  getUserReference<T = User>(userId: string) {
    return this.db.doc<T>(`${this.collectionName}/${userId}`);
  }

  async getUserFromDB(user: FirebaseUser) {
    const userSnap = await this.db.docSnap<readUser>(`users/${user.uid}`);
    if (!userSnap.exists()) {
      return Object.assign({ id: user.uid }, user) as UserWithID;
    } else {
      return Object.assign({ id: user.uid }, userSnap.data()) as UserWithID;
    }
  }

  async updateUserFollowingStatus(user: UserWithID): Promise<void> {
    const userIsFollowing = user?.following ? user.following : false;
    return this.db.update(
      `${this.collectionName}/${user.id}`,
      { following: !userIsFollowing },
    ).then(() => {
      this.logger.log(
        userIsFollowing ? 'You have unfollowed' : 'You are now following',
      );
    });
  }
}
