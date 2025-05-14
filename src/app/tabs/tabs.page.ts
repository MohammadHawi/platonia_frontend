import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  standalone: false,
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(private router:Router, private toaster:ToastController) { }

  ngOnInit() {
  }

onClick(){
  this.toaster.create({
    header: 'Stay!',
    message: 'Are you sure you want to leave?',
    position: 'middle',
    cssClass: 'my-custom-class',
    color:'medium',
    buttons: [
      {
        side: 'end',
        role:'cancel',
        text: 'No',
        handler: () => {
          console.log('Cart Button Clicked');
        }
      }, {
        side: 'end',
        text: 'Yes',
        role: 'go()',
        handler: () => {
          this.router.navigate(['home']);
          console.log('Close clicked');
          
        }
      }
    ]
  }).then((obj) => {
    obj.present();
  });

}


}
