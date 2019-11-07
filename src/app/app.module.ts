import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { RxJSComponent } from './rx-js/rx-js.component';
import { MouseComponent } from './mouse/mouse.component';
import { RegistrationComponent } from './registration/registration.component';

import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';

import { StorageServiceModule } from 'ngx-webstorage-service';
import { LocalStorageServiceService } from './local-storage-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RxJSComponent,
    MouseComponent,
    RegistrationComponent,
    BehaviorSubjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule, MatIconModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule,
    ReactiveFormsModule, 
    StorageServiceModule
  ],
  providers: [LocalStorageServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

