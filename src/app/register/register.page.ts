import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../apis/login.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private service: LoginService, 
    private router: Router, 
    private toaster: ToastController
  ) { }

  ngOnInit() {
  }

  onClick(form: NgForm) {
    // Check if form is valid
    if (form.invalid) {
      this.showToast('Error', 'Please fill all required fields correctly', 'danger');
      return;
    }

    // Check if passwords match
    if (form.value.password !== form.value.password_confirmation) {
      this.showToast('Error', 'Passwords do not match', 'danger');
      return;
    }

    // Validate age
    const age = parseInt(form.value.age);
    if (isNaN(age) || age < 13 || age > 120) {
      this.showToast('Error', 'Please enter a valid age between 13 and 120', 'danger');
      return;
    }

    console.log(form.value);
    
    this.service.register(form.value).subscribe({
      next: (response) => {
        console.log(response['accepted']);

        if (response['accepted']) {
          this.showToast('Success', 'Your account was created successfully', 'success');
          this.router.navigate(['/home']);
        } else {
          console.log('Registration failed');
          this.showToast('Error', 'Registration failed. Please check your information.', 'warning');
        }
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.showToast('Error', 'An error occurred during registration. Please try again.', 'danger');
      }
    });
  }

  private showToast(header: string, message: string, color: string) {
    this.toaster.create({
      header: header,
      message: message,
      position: 'top',
      cssClass: 'my-custom-class',
      color: color,
      duration: 3000
    }).then((obj) => {
      obj.present();
    });
  }

  go() {
    this.router.navigate(['home']);
  }
}