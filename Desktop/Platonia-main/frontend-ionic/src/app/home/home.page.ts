import { Component } from '@angular/core';
import {LoginService} from '../apis/login.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login:any={};

  constructor(private service:LoginService, private router:Router,private toastController:ToastController) {}

  onClick(form:NgForm){
     console.log('Login attempt with:', form.value);

    this.service.login(form.value).subscribe(
      response => {
        console.log('Login response:', response);

        // Handle both response formats: 'success' and 'authenticated'
        if(response && (response['success'] === true || response['authenticated'] === true)) {
          console.log('Login successful, user ID:', response['user'].id);
          localStorage.setItem('user_id', response['user'].id);
          localStorage.setItem('name', response['user'].name);
          
          this.toastController.create({
            header: 'Success',
            message: 'Login successful!',
            position: 'top',
            cssClass: 'my-custom-class',
            color: 'success',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });

          this.router.navigate(['/tabs']);
        } else {
          console.log('Login failed - invalid credentials');
          this.toastController.create({
            header: 'Error, Failed Login',
            message: 'Invalid credentials',
            position: 'top',
            cssClass: 'my-custom-class',
            color: 'danger',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });
        }
      },
      error => {
        console.error('Login error:', error);
        
        // For testing purposes, if backend is not available, allow login with any credentials
        if (error.status === 0 || error.status === 404) {
          console.log('Backend not available, allowing test login');
          localStorage.setItem('user_id', '1');
          localStorage.setItem('name', 'Test User');
          
          this.toastController.create({
            header: 'Test Mode',
            message: 'Backend not available, using test login',
            position: 'top',
            cssClass: 'my-custom-class',
            color: 'warning',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });

          this.router.navigate(['/tabs']);
        } else {
          this.toastController.create({
            header: 'Error',
            message: 'Connection error: ' + (error.message || 'Unknown error'),
            position: 'top',
            cssClass: 'my-custom-class',
            color: 'danger',
            duration: 3000
          }).then((obj) => {
            obj.present();
          });
        }
      }
    );
  }

  testLogin() {
    console.log('Test login clicked');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('name', 'Test User');
    
    this.toastController.create({
      header: 'Test Login',
      message: 'Navigating to app...',
      position: 'top',
      cssClass: 'my-custom-class',
      color: 'success',
      duration: 1500
    }).then((obj) => {
      obj.present();
    });

    // Navigate to tabs
    this.router.navigate(['/tabs']);
  }

  go(){
    this.router.navigate(['register']);
  }
}
