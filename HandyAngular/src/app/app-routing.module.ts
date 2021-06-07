import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationComponent } from './authentication/email-confirmation/email-confirmation.component';
import { ForgetpasswordComponent } from './authentication/forgetpassword/forgetpassword.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { CreateShopComponent } from './create-shop/create-shop.component';
import { HandmadeProductComponent } from './handmade-product/handmade-product.component';
import { HomeNewsComponent } from './home/home-news/home-news.component';
import { HomeSliderComponent } from './home/home-slider/home-slider.component';
import { HomeComponent } from './home/home/home.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {path:'',redirectTo:'Home', pathMatch: 'full' },
  {path:"Home",component : HomeComponent},
  {path:"Register",component : RegisterComponent},
  {path:"Login",component :LoginComponent},
  {path:"ResetPassword",component:ResetPasswordComponent},
  {path:"forgetPassword",component:ForgetpasswordComponent},
  {path:"EmailConfirmation",component:EmailConfirmationComponent},
  {path:"Slider",component:HomeSliderComponent},
  {path:"News",component:HomeNewsComponent},
  {path:"profile/:email",component:ProfileComponent},
  {path: "HandmadeProducts",component:HandmadeProductComponent},
  {path:"CreateShop",component:CreateShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
