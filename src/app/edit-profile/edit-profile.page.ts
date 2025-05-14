import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../apis/profile.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  
})

export class EditProfilePage implements OnInit {
  userr:any=[];
  constructor(private service: ProfileService,private router:Router,private toaster:ToastController) { }

  

  ngOnInit() {
    this.service.getUser(localStorage.getItem('user_id')).subscribe(response=>{
      this.userr=response;
      
      console.log(response);
      
    });
  }

  update(form:NgForm){
    console.log(form.value);
    this.service.update(form.value).subscribe((response:any)=>{
      console.log(response);
      if(response['updated']){
        this.toaster.create({
          header: 'Success',
          message: 'Profile Updated',
          position: 'top',
          cssClass: 'my-custom-class',
          color:'success',
          duration:2000
        }).then((obj) => {
          obj.present();
        });
        this.router.navigate(['tabs/profile']);
      }

      else if(!response['updated']){
        this.toaster.create({
          header: 'Failure',
          message: 'fields should have valid input',
          position: 'top',
          cssClass: 'my-custom-class',
          color:'warning',
          duration:2000
        }).then((obj) => {
          obj.present();
        });
        response=null;


      }
    });
  }

  go(){
    this.router.navigate(['tabs/profile']);
  }

}
