import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {RestaurantComponent} from "./restaurant/restaurant.component";
import {UserLoginComponent} from "./user-login/user-login.component";
import {ContactComponent} from "./contact/contact.component";

const routes: Routes = [
  {path: '', component: UserLoginComponent},
  { path: 'main', component: NavBarComponent },
  { path: 'restaurant', component: RestaurantComponent },
  { path: 'contact', component: ContactComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
