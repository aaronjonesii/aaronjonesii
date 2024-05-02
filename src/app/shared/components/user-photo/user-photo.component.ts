import { Component, Input, OnInit } from '@angular/core';
import { User as dbUser } from '../../interfaces/user';
import { User } from '@angular/fire/auth';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'aj-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrl: './user-photo.component.scss',
  standalone: true,
  imports: [NgOptimizedImage],
})
export class UserPhotoComponent implements OnInit {
  @Input() user?: User | dbUser | null;
  @Input() dim = false;
  @Input() size = 50;
  @Input() image?: string | null = null;
  public userPhotoError = false;

  ngOnInit() {
    /** todo: do not use setTimeout */
    setTimeout(() => {
      if (!this.image && this.user?.photoURL) this.image = this.user.photoURL;
    }, 50);
  }
}
