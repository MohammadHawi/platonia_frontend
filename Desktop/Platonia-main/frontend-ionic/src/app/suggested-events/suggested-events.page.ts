import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import {ShowEventService} from '../apis/show-event.service'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-suggested-events',
  templateUrl: './suggested-events.page.html',
  styleUrls: ['./suggested-events.page.scss'],
})
export class SuggestedEventsPage implements OnInit {

  constructor(private service: ShowEventService, private router:Router, private toaster: ToastController) { }
  events:any=[];

  ngOnInit() {
  }

  go(){
    this.router.navigate(['tabs']);
  }

  ionViewDidEnter() {
    console.log('Loading suggested events for user:', localStorage.getItem('user_id'));
    
    this.service.suggestedEvents(localStorage.getItem('user_id')).subscribe(
      response => {
        console.log('Suggested events response:', response);
        
        if(response && response['success'] === true) {
          this.events = response['suggested_events'] || [];
          console.log('Suggested events loaded:', this.events.length);
        } else {
          console.error('Failed to load suggested events');
          this.toaster.create({
            header: 'Error',
            message: response['message'] || 'Failed to load suggested events',
            position: 'top',
            color: 'danger',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });
        }
      },
      error => {
        console.error('Suggested events error:', error);
        this.toaster.create({
          header: 'Error',
          message: 'Failed to load suggested events',
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
