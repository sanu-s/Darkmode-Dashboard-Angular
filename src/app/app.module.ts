import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {ThemeService} from './core/_services'

import { BasicAuthInterceptor, ErrorInterceptor, LoaderInterceptor } from './core/_helper';

import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UtilitiesModule } from './modules/utilities/utilities.module';
import { ProjectModule } from './modules/project/project.module';
import { LoaderComponent } from './loader/loader.component';
import { OverlayModule} from '@angular/cdk/overlay';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
        OverlayModule,
        AdminModule,
        BrowserAnimationsModule,
        UtilitiesModule,
        ProjectModule
    ],
    declarations: [
        AppComponent,
        LoaderComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        ThemeService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }