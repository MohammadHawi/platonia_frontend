import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../apis/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: false,
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};
  followers: any[] = [];
  following: any[] = [];

  constructor(private service: ProfileService, private router: Router) {}

  ngOnInit() {}

  ionViewDidEnter() {
    const userId = localStorage.getItem('user_id');

    if (!userId) return;

    this.service.getUser(userId).subscribe(response => {
      this.user = response;
    });

    this.service.getFollowers(userId).subscribe(res => {
      this.followers = res.map(f => f.follower); // adjust depending on backend structure
    });

    this.service.getFollowing(userId).subscribe(res => {
      this.following = res.map(f => f.following); // adjust depending on backend structure
    });
  }

  go() {
    this.router.navigate(['edit-profile']);
  }
}

