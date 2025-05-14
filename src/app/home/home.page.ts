import { Component } from '@angular/core';
import {LoginService} from '../apis/login.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: false,
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login:any={};

  constructor(private service:LoginService, private router:Router,private toastController:ToastController) {}



  onClick(form:NgForm){
     console.log(form.value);

    this.service.login(form.value).subscribe(response =>{
      console.log(response);

      if(response['authenticated']==false){
        this.toastController.create({
          header: 'Error, Failed Login',
          message: 'invalid credentials',
          position: 'top',
          cssClass: 'my-custom-class',
          color:'light',
          duration:2000
        }).then((obj) => {
          obj.present();
        });
          console.log ("login failed");
        
      }
      else if(response['authenticated']==true)
      { 

        console.log(response['user'].id)
        localStorage.setItem('user_id',response['user'].id);
        localStorage.setItem('token', response['token']);
        localStorage.setItem('name',response['user'].name);

          this.router.navigate(['/tabs']);
      }


    });
  }
go(){
  this.router.navigate(['register']);
}
goToForgotPassword() {
  this.router.navigate(['/forgot-password']);
}


}
