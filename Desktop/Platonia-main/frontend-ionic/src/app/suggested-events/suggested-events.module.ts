import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestedEventsPageRoutingModule } from './suggested-events-routing.module';

import { SuggestedEventsPage } from './suggested-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestedEventsPageRoutingModule
  ],
  declarations: [SuggestedEventsPage]
})
export class SuggestedEventsPageModule {}
