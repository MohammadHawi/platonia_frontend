import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../apis/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: false,
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
user:any=[];
  constructor(private service : ProfileService, private router:Router) { }

  ngOnInit() {

  }

  ionViewDidEnter(){
    this.service.getUser(localStorage.getItem('user_id')).subscribe(response =>{
      this.user=response;
      console.log(this.user);
      
    });
  }

  go(){
    this.router.navigate(['edit-profile']);
  }
}
