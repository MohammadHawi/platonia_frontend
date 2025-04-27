import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from '../apis/login.service';
import {Router} from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private service:LoginService, private router:Router, private toaster:ToastController) { }

  ngOnInit() {
  }

  onClick(form:NgForm){
    console.log(form.value);
    this.service.register(form.value).subscribe(response=>{

      console.log(response['accepted']);


      if(response['accepted']){

        this.toaster.create({
          header: 'Success',
          message: 'your account was created',
          position: 'top',
          cssClass: 'my-custom-class',
          color:'success',
          duration:2000
        }).then((obj) => {
          obj.present();
        });

        this.router.navigate(['/home']);
      }
      
      else if(!response['accepted']){
        console.log('you have an error');
        this.toaster.create({
          header: 'Error, Failed Register',
          message: 'invalid input',
          position: 'top',
          cssClass: 'my-custom-class',
          color:'warning',
          duration:2000
        }).then((obj) => {
          obj.present();
        });
      }

    });

  }
  go(){
    this.router.navigate(['home']);
  }

}
