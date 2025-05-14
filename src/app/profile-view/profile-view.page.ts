import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../apis/profile.service';
import { ShowEventService } from '../apis/show-event.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  standalone: false,
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private service: ProfileService,
    private followerService: ShowEventService // Assuming you have a service for following users
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.service.getUser(userId).subscribe(response => {
        this.user = response;
        console.log(this.user);
      });
    }
  }

  followUser() {
    this.followerService.followUser(this.user.id).subscribe({
      next: (res: any) => {
        console.log(res.message);
        alert('Followed successfully!');
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message || 'Error following user.');
      }
    });
  }

}
