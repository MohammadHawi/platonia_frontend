import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventMembersPage } from './event-members.page';

const routes: Routes = [
  {
    path: '',
    component: EventMembersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventMembersPageRoutingModule {}
