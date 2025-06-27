import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class ShowEventService {

  constructor(private http: HttpClient, private service: ProfileService) { }
  user: any = [];
  private url = 'http://127.0.0.1:8000/api/'

  getEvent(id) {
    return this.http.get(this.url + 'events/' + id);
  }

  getUserEvent(id) {
    return this.http.get(this.url + 'users/' + id + '/events');
  }

  getEventMembers(id) {
    const userId = localStorage.getItem('user_id');
    const url = this.url + 'events/' + id + '/members';
    console.log('Getting event members from URL:', url);
    console.log('Event ID:', id);
    console.log('User ID:', userId);
    
    // Use GET request with query parameters to satisfy backend validation
    return this.http.get(url + '?event_id=' + id + '&user_id=' + userId);
  }

  removeEventMember(user_id, event_id) {
    return this.http.post(this.url + 'events/members/remove', {
      'user_id': user_id,
      'event_id': event_id
    });
  }

  getFeed(category_id?: string) {
    let url = this.url + 'events';
    if (category_id) {
      url += '?category_id=' + category_id;
    }
    console.log('Feed URL:', url);
    return this.http.get(url);
  }

  createEvent(data) {
    const userId = localStorage.getItem('user_id');
    const userName = localStorage.getItem('name') || 'Unknown User';
    
    // Convert category_id to number if it exists
    const categoryId = data.category_id ? parseInt(data.category_id) : null;
    
    const eventData = {
      'user_id': userId,
      'planner_name': userName,
      'event_topic': data.event_topic,
      'event_place': data.event_place,
      'event_date': data.event_date,
      'event_time': data.event_time,
      'event_capacity': parseInt(data.event_capacity),
      'event_description': data.event_description,
      'category_id': categoryId,
    };
    
    console.log('Creating event with data:', eventData);
    
    return this.http.post(this.url + 'events', eventData);
  }

  joinEvent(user_id, event_id) {
    return this.http.post(this.url + 'events/join', {
      'user_id': user_id,
      'event_id': event_id
    });
  }

  suggestedEvents(user_id) {
    return this.http.post(this.url + 'events/suggested', {
      'user_id': user_id,
    });
  }
}
