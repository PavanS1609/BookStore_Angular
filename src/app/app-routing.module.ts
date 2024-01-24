import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/Login/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GetBooksComponent } from './components/get-books/get-books.component';
import { DisplayCartComponent } from './components/display-cart/display-cart.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';


const routes: Routes = [
  {path :'Login-SignUp',component:SignUpComponent},
  { path: 'ForgetPassword', component:ForgetPasswordComponent },
  { path: 'ResetPassword/:token', component:ResetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
   { path: 'getBooks', component: GetBooksComponent },
  { path: 'cart', component: DisplayCartComponent },
  { path: 'Home', component: HomeDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
