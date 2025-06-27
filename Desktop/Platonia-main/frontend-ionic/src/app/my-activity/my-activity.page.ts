import { Component, OnInit } from '@angular/core';
import { ShowEventService } from '../apis/show-event.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-my-activity',
  templateUrl: './my-activity.page.html',
  styleUrls: ['./my-activity.page.scss'],
})
export class MyActivityPage implements OnInit {
  events: any = [];
  user_id: string;
  isLoading = true;

  constructor(
    private service: ShowEventService,
    private router: Router,
    private toaster: ToastController
  ) { }

  ngOnInit() {
    this.loadUserEvents();
  }

  ionViewDidEnter() {
    this.loadUserEvents();
  }

  loadUserEvents() {
    this.isLoading = true;
    const userId = localStorage.getItem('user_id');
    
    if (!userId) {
      this.isLoading = false;
      this.showToast('User not authenticated', 'warning');
      return;
    }

    this.service.getUserEvent(userId).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        if (response && response['success'] === true) {
          this.events = response['events'] || [];
          this.user_id = userId;
        } else {
          this.events = [];
          this.showToast(response['message'] || 'Failed to load your events', 'warning');
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.events = [];
        this.showToast('Failed to load your events', 'danger');
      }
    });
  }

  go(eventId: string) {
    localStorage.setItem('event_id', eventId);
    this.router.navigate(['event-members']);
  }

  viewEvent(eventId: string) {
    localStorage.setItem('event_id', eventId);
    this.router.navigate(['activity']);
  }

  createEvent() {
    this.router.navigate(['add-activity']);
  }

  showToast(message: string, color: string) {
    this.toaster.create({
      header: color === 'success' ? 'Success' : 'Notice',
      message: message,
      position: 'top',
      color: color,
      duration: 3000
    }).then((obj) => {
      obj.present();
    });
  }

  // Refresh events
  doRefresh(event: any) {
    this.loadUserEvents();
    event.target.complete();
  }
}
