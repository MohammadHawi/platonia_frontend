import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../apis/dashboard.service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  dashboard:any=[];
  constructor(private service: DashboardService, private router:Router) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.service.dashboard(localStorage.getItem('user_id')).subscribe(response => {
      this.dashboard=response;
      console.log('retrieved');
      console.log(this.dashboard);
    })
  }

}
