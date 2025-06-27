import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient) { }

  private url = 'http://127.0.0.1:8000/api/';

  dashboard(user_id: any) {
    return this.http.post(this.url + 'dashboard',  {
    'user_id': user_id
    });
  }
}
