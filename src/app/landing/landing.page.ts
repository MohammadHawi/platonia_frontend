import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ShowEventService} from '../apis/show-event.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  standalone: false,
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  events:any=[];
  categories:any=[];
  selectedCategory:any=null;

  constructor(private service: ShowEventService ,private router:Router) {

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

  goToProfile(userId: string) {
  this.router.navigate(['profile-view', userId]);
}


  getFeed(event?:any){
    const category_id = this.selectedCategory;
    console.log(category_id);
    this.service.getFeed(category_id).subscribe(response =>{
      this.events=response['data'];
      console.log('Events:', this.events);
      this.categories=response['categories'];

    });
  }

}
