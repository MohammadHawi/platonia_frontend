import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import {ShowEventService} from '../apis/show-event.service'
@Component({
  selector: 'app-event-members',
  standalone: false,
  templateUrl: './event-members.page.html',
  styleUrls: ['./event-members.page.scss'],
})
export class EventMembersPage implements OnInit {
  members:any=[];
  constructor(private service: ShowEventService, private router:Router) { }
  user_id!: string;

  ngOnInit() {
  }

  go(){
    this.router.navigate(['tabs']);
  }

  ionViewDidEnter() {
    this.service.getEventMembers(localStorage.getItem('event_id')).subscribe(response => {
      this.members=response;
      console.log('retrieved');
      console.log(this.members);
      this.user_id = localStorage.getItem('user_id') || '';
    })
  }

  removeMember(user_id, event_id){
    this.service.removeEventMember(user_id, event_id).subscribe(response => {
      console.log(response);
      this.ionViewDidEnter();
    })
  }

}
