import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';
@Injectable({
  providedIn: 'root'
})
export class ShowEventService {

  constructor(private http: HttpClient, private service: ProfileService) { }
  user:any=[];
  private url ='http://127.0.0.1:8000/api/'

  getEvent(id){
    return this.http.get(this.url+'event/' + id);
  }

  getUserEvent(id){
    return this.http.get(this.url+'userView/' + id);
  }

  getEventMembers(id){
    return this.http.get(this.url+'event-members/' + id);
  }

  removeEventMember(user_id, event_id){
    return this.http.post(this.url+'event-members/remove', {
      'user_id': user_id,
      'event_id': event_id
    });
  }


  getFeed(category_id?: string){
    const url = this.url+'landing'+(category_id ? category_id : '')
    console.log(url);
    return this.http.get(url);
  }

  createEvent(data) {
    return this.http.post(this.url + 'newEvent', {
      user_id: parseInt(localStorage.getItem('user_id') || '0', 10),
      planner_name: localStorage.getItem('name'),
      event_topic: data.event_topic,
      event_place: data.event_place,
      event_date: data.event_date,
      event_time: data.event_time,
      event_capacity: data.event_capacity,
      event_description: data.event_description,
      category_id: parseInt(data.category_id, 10)
    });
  }

  joinEvent(user_id,event_id){
    return this.http.post(this.url+'joinEvent',{
      'user_id': user_id,
      'event_id':event_id
    });
  }

  suggestedEvents(user_id){
    return this.http.post(this.url+'suggested-events',{
      'user_id': user_id,
    });
  }

  followUser(userId: string) {
    return this.http.post(this.url+'follow', {
      user_id: userId
    });
  }
}
