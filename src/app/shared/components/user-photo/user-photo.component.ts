import { Component, Input } from '@angular/core';
import { User as dbUser } from '../../interfaces/user';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'aj-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss']
})
export class UserPhotoComponent {
  @Input() user?: User | dbUser | null;
  @Input() dim = false;
  @Input() size = 50;
  @Input() uid?: string; // todo: get user from db to load image
  public userPhotoError = false;
}
