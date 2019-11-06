import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RxJSComponent } from './rx-js/rx-js.component';
import { MouseComponent } from './mouse/mouse.component';
import { RegistrationComponent } from './registration/registration.component';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';

const routes: Routes = [
                          {path:'', redirectTo:'home', pathMatch:'full'},
                          {path:'home', component:HomeComponent},
                          {path:'mouse', component:MouseComponent},                          
                          {path:'about', component:AboutComponent},
                          {path:'rxjs', component:RxJSComponent},
                          {path:'registration', component:RegistrationComponent},
                          {path:'behavior', component: BehaviorSubjectComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
