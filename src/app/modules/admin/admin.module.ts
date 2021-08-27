import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs'
import {SharedModule} from '../shared/shared.module'
import {MatDialogModule} from '@angular/material/dialog'
import { SubscriptionComponent } from './subscription/subscription.component';
import {MatDividerModule} from '@angular/material/divider'
import {MatListModule} from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule  } from '@angular/material/checkbox'
import {MatCardModule} from '@angular/material/card'
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MglTimelineModule } from 'angular-mgl-timeline';



@NgModule({
  declarations: [HomeComponent, SubscriptionComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MatTableModule,
    MatInputModule,
    MglTimelineModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      titleColor:'gray',
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
      
    }),
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule
    
  ],

})
export class AdminModule { }
