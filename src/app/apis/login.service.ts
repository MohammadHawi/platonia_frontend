import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private url = 'http://127.0.0.1:8000/api/'

  login(user: any) {
    return this.http.post(this.url + 'login', 
    {
    'email': user.email,
    'password': user.password 
  });
  }

  register(user:any){
    return this.http.post(this.url+'register',
    {
    'email':user.email,
    'password':user.password,
    'password_confirmation':user.password_confirmation,
    'name':user.name,
    'age':user.age,
    'gender':user.gender
  });
  }
  sendResetLink(email: string) {
  return this.http.post<any>(this.url+'forgot-password', { email });
}

}
