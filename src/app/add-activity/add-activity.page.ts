import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../apis/profile.service';
import { ShowEventService } from '../apis/show-event.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-activity',
  standalone: false,
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {

  constructor(private router:Router, private service : ShowEventService, private pservice:ProfileService,private toaster:ToastController ) { }
  user:any=[];
  categories:any=[];

  ngOnInit() {
    this.pservice.getUser(localStorage.getItem('user_id')).subscribe(response =>{
      this.user=response;
    });
    this.service.getFeed().subscribe(response =>{
      console.log(response);
      this.categories=response['categories'];
    });
  }

  go(){
    this.router.navigate(['tabs']);
  }

    publish(form:NgForm){
      console.log(form.value);

      

      this.service.createEvent(form.value).subscribe((response:any)=>{
        console.log(response);


        if(response['state']){

          this.toaster.create({
            header: 'Success',
            message: 'Event Created!',
            position: 'top',
            cssClass: 'my-custom-class',
            color:'success',
            duration:2000
          }).then((obj) => {
            obj.present();
          });
          this.router.navigate(['tabs']);
        }
        else if(!response['state']){
          this.toaster.create({
            header: 'Failure:',
            message: 'Please fill al fields with valid input',
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
}
