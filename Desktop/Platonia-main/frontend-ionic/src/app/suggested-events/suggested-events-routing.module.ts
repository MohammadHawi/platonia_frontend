import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestedEventsPage } from './suggested-events.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestedEventsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestedEventsPageRoutingModule {}
