import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../apis/profile.service';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};
  editForm: FormGroup;
  isEditing = false;
  isEditingInterests = false;
  isSaving = false;
  interestsText = '';
  userStats: any = {};

  popularInterests = [
    'Sports', 'Music', 'Reading', 'Travel', 'Cooking', 
    'Photography', 'Gaming', 'Art', 'Technology', 'Fitness',
    'Dancing', 'Writing', 'Hiking', 'Movies', 'Fashion',
    'Pets', 'Gardening', 'Volunteering', 'Learning', 'Socializing'
  ];

  constructor(
    private service: ProfileService, 
    private router: Router, 
    private toaster: ToastController,
    private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(13), Validators.max(120)]],
      gender: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loadUserProfile();
    this.loadUserStats();
  }

  loadUserProfile() {
    this.service.getUser(localStorage.getItem('user_id')).subscribe(
      response => {
        console.log('Profile response:', response);
        
        if (response && response['success'] === true) {
          this.user = response['user'];
          this.interestsText = this.user.interests || '';
          console.log('User data:', this.user);
        } else {
          console.error('Failed to get user data');
          this.showToast('Error', response['message'] || 'Failed to load profile', 'danger');
        }
      },
      error => {
        console.error('Profile error:', error);
        this.showToast('Error', 'Failed to load profile data', 'danger');
      }
    );
  }

  loadUserStats() {
    // This would typically come from a stats service
    // For now, we'll use placeholder data
    this.userStats = {
      eventsCreated: 0,
      eventsJoined: 0,
      totalMembers: 0
    };
  }

  toggleEditMode() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editForm.patchValue({
        name: this.user.name || '',
        email: this.user.email || '',
        age: this.user.age || '',
        gender: this.user.gender || ''
      });
    }
  }

  toggleInterestsEdit() {
    this.isEditingInterests = !this.isEditingInterests;
    if (this.isEditingInterests) {
      this.interestsText = this.user.interests || '';
    }
  }

  saveProfile() {
    if (this.editForm.valid) {
      this.isSaving = true;
      const formData = this.editForm.value;
      
      // Here you would typically call an update service
      // For now, we'll simulate the update
      setTimeout(() => {
        this.user = { ...this.user, ...formData };
        this.isEditing = false;
        this.isSaving = false;
        this.showToast('Success', 'Profile updated successfully', 'success');
      }, 1000);
    }
  }

  saveInterests() {
    this.isSaving = true;
    
    // Here you would typically call an update service
    // For now, we'll simulate the update
    setTimeout(() => {
      this.user.interests = this.interestsText;
      this.isEditingInterests = false;
      this.isSaving = false;
      this.showToast('Success', 'Interests updated successfully', 'success');
    }, 1000);
  }

  cancelEdit() {
    this.isEditing = false;
    this.editForm.reset();
  }

  cancelInterestsEdit() {
    this.isEditingInterests = false;
    this.interestsText = this.user.interests || '';
  }

  addInterest(interest: string) {
    if (!this.interestsText.includes(interest)) {
      this.interestsText = this.interestsText 
        ? this.interestsText + ', ' + interest 
        : interest;
    }
  }

  showToast(header: string, message: string, color: string) {
    this.toaster.create({
      header: header,
      message: message,
      position: 'top',
      color: color,
      duration: 2000
    }).then((obj) => {
      obj.present();
    });
  }

  go() {
    this.router.navigate(['edit-profile']);
  }
}
