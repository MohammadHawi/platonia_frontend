import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ShowEventService} from '../apis/show-event.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  events:any=[];
  categories:any=[];
  selectedCategory:any=null;

  constructor(private service: ShowEventService ,private router:Router, private toaster: ToastController) {

  }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.getFeed(null);
  }

  go(id){
    localStorage.setItem('event_id',id);
    this.router.navigate(['activity']);
  }

  add(){
    this.router.navigate(['add-activity'], {skipLocationChange: false});
  }

  onClickHandler(){
    this.router.navigate(['suggested-events']);
  }

  getFeed(event?:any){
    const category_id = this.selectedCategory;
    console.log('Getting feed for category:', category_id);
    
    this.service.getFeed(category_id).subscribe(
      response => {
        console.log('Feed response:', response);
        
        if(response && response['success'] === true) {
          this.events = response['data'] || [];
          this.categories = response['categories'] || [];
          console.log('Events loaded:', this.events.length);
          console.log('Categories loaded:', this.categories.length);
        } else {
          console.error('Failed to load feed');
          this.toaster.create({
            header: 'Error',
            message: response['message'] || 'Failed to load events',
            position: 'top',
            color: 'danger',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });
        }
      },
      error => {
        console.error('Feed error:', error);
        this.toaster.create({
          header: 'Error',
          message: 'Failed to load events',
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
