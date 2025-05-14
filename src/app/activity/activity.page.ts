import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'
import {ShowEventService} from '../apis/show-event.service'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  standalone: false,
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  data:any=[];
  cap:any;
  constructor(private service: ShowEventService, private router:Router,private toaster:ToastController) { }

  ngOnInit() {
    let id = localStorage.getItem('event_id');

    this.service.getEvent(id).subscribe( response => {
      this.data=response['event'];
      this.cap=response['capacity'];
      console.log(this.cap);
    });
  }

  go(){
    this.router.navigate(['tabs']);
  }

  join(){
    this.service.joinEvent(localStorage.getItem('user_id'),localStorage.getItem('event_id'))
    .subscribe((response: any) =>{

      console.log(response);

      if(response['state']){
        this.toaster.create({
          header: 'Enjoy',
          message: response['message'],
          position: 'top',
          cssClass: 'my-custom-class',
          color:'success',
          duration:2000
        }).then((obj) => {
          obj.present();
        });
        response=null;
        this.router.navigate(['tabs']);
        

      }
      else if(!response['state']){
        this.toaster.create({
          header: 'Sorry, You Cannot Join:',
          message: response['message'],
          position: 'top',
          cssClass: 'my-custom-class',
          color:'warning',
          duration:2000
        }).then((obj) => {
          obj.present();
        });
        response=null;


      }


    })
  }
}
