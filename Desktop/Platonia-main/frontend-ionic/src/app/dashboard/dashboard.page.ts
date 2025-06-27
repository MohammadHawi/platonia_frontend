import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../apis/dashboard.service';
import { Router} from '@angular/router'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  dashboard:any=[];
  constructor(private service: DashboardService, private router:Router, private toaster: ToastController) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.service.dashboard(localStorage.getItem('user_id')).subscribe(
      response => {
        console.log('Dashboard response:', response);
        
        if(response && response['success'] === true) {
          this.dashboard = response['dashboard_data'];
          console.log('Dashboard data loaded:', this.dashboard);
        } else {
          console.error('Failed to load dashboard data');
          this.toaster.create({
            header: 'Error',
            message: response['message'] || 'Failed to load dashboard',
            position: 'top',
            color: 'danger',
            duration: 2000
          }).then((obj) => {
            obj.present();
          });
        }
      },
      error => {
        console.error('Dashboard error:', error);
        this.toaster.create({
          header: 'Error',
          message: 'Failed to load dashboard data',
          position: 'top',
          color: 'danger',
          duration: 2000
        }).then((obj) => {
          obj.present();
        });
      }
    );
  }

}
