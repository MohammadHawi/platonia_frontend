import { Component, OnInit } from '@angular/core';
import {ShowEventService} from '../apis/show-event.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-activity',
  standalone: false,
  templateUrl: './my-activity.page.html',
  styleUrls: ['./my-activity.page.scss'],
})
export class MyActivityPage implements OnInit {

  constructor(private service: ShowEventService ,private router:Router) {

  }
events:any=[];
user_id!: string;

ngOnInit() {


}

go(id){
  localStorage.setItem('event_id',id);
  this.router.navigate(['event-members']);
}

ionViewDidEnter() {
    this.service.getUserEvent(localStorage.getItem('user_id')).subscribe(response => {
      this.events=response;
      console.log(this.events);
      this.user_id = localStorage.getItem('user_id') || '';
      console.log(this.user_id);
      console.log(this.events[0].user_id);
      console.log('retrieved');
    })
  }

}
