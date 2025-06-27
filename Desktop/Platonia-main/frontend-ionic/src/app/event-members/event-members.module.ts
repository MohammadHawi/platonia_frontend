import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventMembersPageRoutingModule } from './event-members-routing.module';

import { EventMembersPage } from './event-members.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventMembersPageRoutingModule
  ],
  declarations: [EventMembersPage]
})
export class EventMembersPageModule {}
