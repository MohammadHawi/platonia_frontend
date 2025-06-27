import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import {ShowEventService} from '../apis/show-event.service'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-event-members',
  templateUrl: './event-members.page.html',
  styleUrls: ['./event-members.page.scss'],
})
export class EventMembersPage implements OnInit {
  members:any=[];
  eventDetails: any = null;
  isEventCreator: boolean = false;
  
  constructor(private service: ShowEventService, private router:Router, private toaster: ToastController) { }
  user_id: string;

  ngOnInit() {
  }

  go(){
    this.router.navigate(['tabs']);
  }

  ionViewDidEnter() {
    const eventId = localStorage.getItem('event_id');
    console.log('Loading event members for event ID:', eventId);
    
    if (!eventId) {
      console.error('No event ID found in localStorage');
      this.toaster.create({
        header: 'Error',
        message: 'No event ID found. Please select an event first.',
        position: 'top',
        color: 'danger',
        duration: 2000
      }).then((obj) => {
        obj.present();
      });
      return;
    }
    
    // First, get event details to check if current user is the creator
    this.service.getEvent(eventId).subscribe(
      eventResponse => {
        console.log('Event details response:', eventResponse);
        
        if(eventResponse && eventResponse['success'] === true) {
          this.eventDetails = eventResponse['event'];
          const currentUserId = localStorage.getItem('user_id');
          
          // Check if current user is the event creator
          this.isEventCreator = this.eventDetails.user_id == currentUserId;
          console.log('Is event creator:', this.isEventCreator);
          console.log('Event creator ID:', this.eventDetails.user_id);
          console.log('Current user ID:', currentUserId);
        }
        
        // Then load event members
        this.loadEventMembers(eventId);
      },
      eventError => {
        console.error('Failed to load event details:', eventError);
        // Still try to load members even if event details fail
        this.loadEventMembers(eventId);
      }
    );
  }

  loadEventMembers(eventId: string) {
    this.service.getEventMembers(eventId).subscribe(
      response => {
        console.log('Event members response:', response);
        console.log('Response type:', typeof response);
        console.log('Response keys:', Object.keys(response));
        
        if(response && response['success'] === true) {
          this.members = response['members'] || [];
          console.log('Members loaded:', this.members.length);
          console.log('Members data:', this.members);
          this.user_id = localStorage.getItem('user_id');
        } else {
          console.error('Failed to load event members - no success flag');
          console.log('Response structure:', response);
          this.toaster.create({
            header: 'Error',
            message: response['message'] || 'Failed to load event members',
            position: 'top',
            color: 'danger',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });
        }
      },
      error => {
        console.error('Event members error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error details:', error.error);
        
        let errorMessage = 'Failed to load event members';
        if (error.status === 404) {
          errorMessage = 'Event not found or no members available';
        } else if (error.status === 500) {
          errorMessage = 'Server error occurred';
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        
        this.toaster.create({
          header: 'Error',
          message: errorMessage,
          position: 'top',
          color: 'danger',
          duration: 3000
        }).then((obj) => {
          obj.present();
        });
      }
    );
  }

  removeMember(user_id, event_id){
    // Check if current user is the event creator
    if (!this.isEventCreator) {
      this.toaster.create({
        header: 'Unauthorized',
        message: 'Only the event creator can remove members',
        position: 'top',
        color: 'warning',
        duration: 3000
      }).then((obj) => {
        obj.present();
      });
      return;
    }

    // Check if trying to remove the event creator
    if (user_id == this.eventDetails.user_id) {
      this.toaster.create({
        header: 'Cannot Remove',
        message: 'Cannot remove the event creator',
        position: 'top',
        color: 'warning',
        duration: 3000
      }).then((obj) => {
        obj.present();
      });
      return;
    }

    console.log('Removing member:', user_id, 'from event:', event_id);
    
    this.service.removeEventMember(user_id, event_id).subscribe(
      response => {
        console.log('Remove member response:', response);
        
        if(response && response['success'] === true) {
          this.toaster.create({
            header: 'Success',
            message: response['message'] || 'Member removed successfully',
            position: 'top',
            color: 'success',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });
          this.ionViewDidEnter(); // Refresh the list
        } else {
          this.toaster.create({
            header: 'Error',
            message: response['message'] || 'Failed to remove member',
            position: 'top',
            color: 'warning',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });
        }
      },
      error => {
        console.error('Remove member error:', error);
        let errorMessage = 'Failed to remove member';
        
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        this.toaster.create({
          header: 'Error',
          message: errorMessage,
          position: 'top',
          color: 'danger',
          duration: 2000
        }).then((obj) => {
          obj.present();
        });
      }
    );
  }
}
