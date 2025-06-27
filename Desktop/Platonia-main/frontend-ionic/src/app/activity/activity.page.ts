import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import {ShowEventService} from '../apis/show-event.service'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  data:any=[];
  cap:any;
  remainingCapacity:any;
  currentAttendees:any;
  isFull:boolean = false;
  
  constructor(private service: ShowEventService, private router:Router,private toaster:ToastController) { }

  ngOnInit() {
    let id = localStorage.getItem('event_id');
    console.log('Loading event with ID:', id);

    this.service.getEvent(id).subscribe(
      response => {
        console.log('Event response:', response);
        
        if(response && response['success'] === true) {
          this.data = response['event'];
          this.remainingCapacity = response['remaining_capacity'];
          this.currentAttendees = response['current_attendees'];
          this.isFull = response['is_full'];
          console.log('Event loaded:', this.data);
          console.log('Capacity info:', {
            remaining: this.remainingCapacity,
            current: this.currentAttendees,
            isFull: this.isFull
          });
        } else {
          console.error('Failed to load event');
          this.toaster.create({
            header: 'Error',
            message: response['message'] || 'Failed to load event',
            position: 'top',
            color: 'danger',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });
        }
      },
      error => {
        console.error('Event error:', error);
        this.toaster.create({
          header: 'Error',
          message: 'Failed to load event details',
          position: 'top',
          color: 'danger',
          duration: 2000
        }).then((obj) => {
          obj.present();
        });
      }
    );
  }

  go(){
    this.router.navigate(['tabs']);
  }

  join(){
    console.log('Joining event...');
    this.service.joinEvent(localStorage.getItem('user_id'),localStorage.getItem('event_id'))
    .subscribe(
      response => {
        console.log('Join response:', response);

        if(response && response['success'] === true){
          this.toaster.create({
            header: 'Success!',
            message: response['message'],
            position: 'top',
            cssClass: 'my-custom-class',
            color:'success',
            duration:2000
          }).then((obj) => {
            obj.present();
          });
          this.router.navigate(['tabs']);
        } else {
          this.toaster.create({
            header: 'Cannot Join Event',
            message: response['message'] || 'Failed to join event',
            position: 'top',
            cssClass: 'my-custom-class',
            color:'warning',
            duration:2000
          }).then((obj) => {
            obj.present();
          });
        }
      },
      error => {
        console.error('Join error:', error);
        let errorMessage = 'Failed to join event';
        
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.toaster.create({
          header: 'Error',
          message: errorMessage,
          position: 'top',
          cssClass: 'my-custom-class',
          color:'danger',
          duration:2000
        }).then((obj) => {
          obj.present();
        });
      }
    );
  }

  viewMembers() {
    console.log('Navigating to event members for event ID:', localStorage.getItem('event_id'));
    this.router.navigate(['event-members']);
  }
}
