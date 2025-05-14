import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import {ShowEventService} from '../apis/show-event.service'
@Component({
  selector: 'app-suggested-events',
  standalone: false,
  templateUrl: './suggested-events.page.html',
  styleUrls: ['./suggested-events.page.scss'],
})
export class SuggestedEventsPage implements OnInit {

  constructor(private service: ShowEventService, private router:Router) { }
  events:any=[];

  ngOnInit() {
  }

  go(){
    this.router.navigate(['tabs']);
  }

  ionViewDidEnter() {
    this.service.suggestedEvents(localStorage.getItem('user_id')).subscribe(response => {
      this.events=response;
      console.log('retrieved');
      console.log(this.events);
    })
  }

}
