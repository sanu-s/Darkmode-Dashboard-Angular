import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from '../admin/home/home.component'

import {SubscriptionComponent} from './subscription/subscription.component'


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'user-details/:id', component: SubscriptionComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
