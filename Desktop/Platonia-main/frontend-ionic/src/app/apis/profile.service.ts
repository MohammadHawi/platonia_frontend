import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private url = 'http://127.0.0.1:8000/api/';

  getUser(id: string): Observable<any> {
    // Use the correct endpoint from Laravel routes: /api/users/{id}
    return this.http.get(this.url + 'users/' + id);
  }

  updateProfile(user: any): Observable<any> {
    // Use the correct endpoint from Laravel routes: /api/profile/edit
    return this.http.post(this.url + 'profile/edit', {
      'id': localStorage.getItem('user_id'),
      'name': user.name,
      'age': user.age,
      'gender': user.gender,
      'interests': user.interests || ''
    });
  }
}
