import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilitiesRoutingModule } from './utilities-routing.module';
import { ProfileComponent } from './profile/profile.component';
import {MatTabsModule} from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import {SharedModule} from '../shared/shared.module'
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio'
import {MatSlideToggleModule} from '@angular/material/slide-toggle'
import { OverlayModule} from '@angular/cdk/overlay';



@NgModule({
  declarations: [ProfileComponent, MainToolbarComponent],
  imports: [
    CommonModule,
    UtilitiesRoutingModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    ReactiveFormsModule ,
    MatInputModule,
    FormsModule,
    SharedModule,
    OverlayModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule
  
  ], 
  exports: [MainToolbarComponent]
})
export class UtilitiesModule { }
