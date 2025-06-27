import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../apis/profile.service';
import { ShowEventService } from '../apis/show-event.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {

  constructor(private router:Router, private service : ShowEventService, private pservice:ProfileService,private toaster:ToastController ) { }
  user:any=[];
  categories:any=[];

  ngOnInit() {
    console.log('Loading user data for ID:', localStorage.getItem('user_id'));
    
    this.pservice.getUser(localStorage.getItem('user_id')).subscribe(
      response => {
        console.log('User response:', response);
        
        if(response && response['success'] === true) {
          this.user = response['user'];
          console.log('User data loaded:', this.user);
        } else {
          console.error('Failed to load user data');
        }
      },
      error => {
        console.error('User error:', error);
      }
    );
    
    this.service.getFeed().subscribe(
      response => {
        console.log('Categories response:', response);
        
        if(response && response['success'] === true) {
          this.categories = response['categories'] || [];
          console.log('Categories loaded:', this.categories.length);
        } else {
          console.error('Failed to load categories');
        }
      },
      error => {
        console.error('Categories error:', error);
      }
    );
  }

  go(){
    this.router.navigate(['tabs']);
  }

  publish(form:NgForm){
    console.log('Form value:', form.value);
    console.log('Form valid:', form.valid);
    console.log('LocalStorage user_id:', localStorage.getItem('user_id'));
    console.log('LocalStorage name:', localStorage.getItem('name'));
    
    if (!form.valid) {
      this.toaster.create({
        header: 'Validation Error',
        message: 'Please fill all required fields correctly',
        position: 'top',
        cssClass: 'my-custom-class',
        color:'warning',
        duration:3000
      }).then((obj) => {
        obj.present();
      });
      return;
    }

    console.log('Creating event with data:', form.value);

    this.service.createEvent(form.value).subscribe(
      response => {
        console.log('Create event response:', response);

        if(response && response['success'] === true){
          this.toaster.create({
            header: 'Success',
            message: response['message'] || 'Event Created Successfully!',
            position: 'top',
            cssClass: 'my-custom-class',
            color:'success',
            duration:2000
          }).then((obj) => {
            obj.present();
          });
          this.router.navigate(['tabs']);
        } else {
          this.toaster.create({
            header: 'Failed to Create Event',
            message: response['message'] || 'Please fill all fields with valid input',
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
        console.error('Create event error:', error);
        let errorMessage = 'Failed to create event';
        
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else if (error.error && error.error.errors) {
          // Handle validation errors
          const errors = error.error.errors;
          console.log('Validation errors:', errors);
          
          // Format all validation errors
          const errorMessages = [];
          for (const field in errors) {
            if (errors.hasOwnProperty(field)) {
              const fieldErrors = errors[field];
              if (Array.isArray(fieldErrors)) {
                errorMessages.push(`${field}: ${fieldErrors.join(', ')}`);
              } else {
                errorMessages.push(`${field}: ${fieldErrors}`);
              }
            }
          }
          errorMessage = errorMessages.join('; ');
        }

        this.toaster.create({
          header: 'Error',
          message: errorMessage,
          position: 'top',
          cssClass: 'my-custom-class',
          color:'danger',
          duration:5000
        }).then((obj) => {
          obj.present();
        });
      }
    );
  }
}
