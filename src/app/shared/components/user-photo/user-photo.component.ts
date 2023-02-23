import { Component, Input, OnInit } from '@angular/core';
import { User as dbUser } from '../../interfaces/user';
import { User } from '@angular/fire/auth';
import { DocumentReference } from "@angular/fire/firestore";

@Component({
  selector: 'aj-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss']
})
export class UserPhotoComponent implements OnInit {
  @Input() user?: User | dbUser | null;
  @Input() dim = false;
  @Input() size = 50;
  @Input() image?: string | null = null;
  public userPhotoError = false;

  ngOnInit() {
    if (!this.image && this.user?.photoURL) this.image = this.user.photoURL;
  }
}
