import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from '../apis/login.service';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private service:LoginService, private router:Router, private toaster:ToastController) { }

  ngOnInit() {
  }

  onClick(form:NgForm){
    console.log('Register attempt with:', form.value);
    this.service.register(form.value).subscribe(
      response => {
        console.log('Register response:', response);

        if(response && response['success'] === true){
          this.toaster.create({
            header: 'Success',
            message: response['message'] || 'Your account was created',
            position: 'top',
            cssClass: 'my-custom-class',
            color:'success',
            duration:2000
          }).then((obj) => {
            obj.present();
          });

          this.router.navigate(['/home']);
        } else {
          console.log('Registration failed');
          this.toaster.create({
            header: 'Error, Failed Register',
            message: response['message'] || 'Invalid input',
            position: 'top',
            cssClass: 'my-custom-class',
            color:'warning',
            duration:2000
          }).then((obj) => {
            obj.present();
          });
        }
      },
      error => {
        console.error('Register error:', error);
        let errorMessage = 'Registration failed';
        
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.error && error.error.errors) {
          // Handle validation errors
          const errors = error.error.errors;
          const firstError = Object.values(errors)[0];
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
        }

        this.toaster.create({
          header: 'Error, Failed Register',
          message: errorMessage,
          position: 'top',
          cssClass: 'my-custom-class',
          color:'danger',
          duration:3000
        }).then((obj) => {
          obj.present();
        });
      }
    );
  }

  go(){
    this.router.navigate(['home']);
  }
}
