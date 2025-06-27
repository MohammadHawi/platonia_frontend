import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../apis/profile.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user: any = {};
  formData: any = {
    name: '',
    age: '',
    gender: '',
    interests: ''
  };
  genderOptions = ['Male', 'Female', 'Other'];
  isLoading = true;
  isSaving = false;
  
  constructor(
    private service: ProfileService,
    private router: Router,
    private toaster: ToastController
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.service.getUser(userId).subscribe({
        next: (response) => {
          // Handle different possible response structures
          if (response && response.success && response.user) {
            // Response has {success: true, user: {...}}
            this.user = response.user;
          } else if (response && response.id) {
            // Response is directly the user object
            this.user = response;
          } else {
            // Fallback - use response as is
            this.user = response;
          }
          
          // Populate form data with user data
          this.formData = {
            name: this.user.name || '',
            age: this.user.age || '',
            gender: this.user.gender || '',
            interests: this.user.interests || ''
          };
          
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
          this.showToast('Error loading profile', 'danger');
        }
      });
    }
  }

  update(form: NgForm) {
    if (form.valid) {
      this.isSaving = true;
      
      // Use the form data
      const updateData = {
        name: this.formData.name,
        age: this.formData.age,
        gender: this.formData.gender,
        interests: this.formData.interests || ''
      };
      
      this.service.updateProfile(updateData).subscribe({
        next: (response) => {
          this.isSaving = false;
          
          if (response.success) {
            this.showToast('Profile updated successfully', 'success');
            this.router.navigate(['tabs/profile']);
          } else {
            this.showToast(response.message || 'Failed to update profile', 'warning');
          }
        },
        error: (error) => {
          this.isSaving = false;
          
          if (error.status === 422) {
            // Validation errors
            const errorMessage = this.formatValidationErrors(error.error.errors);
            this.showToast(errorMessage, 'warning');
          } else {
            this.showToast('Failed to update profile. Please try again.', 'danger');
          }
        }
      });
    } else {
      this.showToast('Please fill all required fields correctly', 'warning');
    }
  }

  formatValidationErrors(errors: any): string {
    if (!errors) return 'Validation failed';
    
    const errorMessages = [];
    for (const field in errors) {
      if (errors.hasOwnProperty(field)) {
        errorMessages.push(`${field}: ${errors[field].join(', ')}`);
      }
    }
    return errorMessages.join('; ');
  }

  showToast(message: string, color: string) {
    this.toaster.create({
      header: color === 'success' ? 'Success' : 'Notice',
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
    this.router.navigate(['tabs/profile']);
  }
}
