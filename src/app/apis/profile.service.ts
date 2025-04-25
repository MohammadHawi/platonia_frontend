import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private url ='http://127.0.0.1:8000/api/';

  getUser(id){
    return this.http.get(this.url+'user/' + id);
  }

  update(user:any){
    return this.http.post(this.url+'editProfile',
    {
    'id':localStorage.getItem('user_id'),
    'name':user.name,
    'email':user.email,
    'age':user.age,
    'gender':user.gender,
    'interests':user.interests
  });
  }
}
