import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RxJSComponent } from './rx-js/rx-js.component';
import { MouseComponent } from './mouse/mouse.component';

const routes: Routes = [
                          {path:'', redirectTo:'home', pathMatch:'full'},
                          {path:'home', component:HomeComponent},
                          {path:'mouse', component:MouseComponent},                          
                          {path:'about', component:AboutComponent},
                          {path:'rxjs', component:RxJSComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
