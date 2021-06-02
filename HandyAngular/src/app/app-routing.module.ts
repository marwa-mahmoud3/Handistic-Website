import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmationComponent } from './authentication/email-confirmation/email-confirmation.component';
import { ForgetpasswordComponent } from './authentication/forgetpassword/forgetpassword.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductsListComponent } from './products/products-list/products-list.component';


const routes: Routes = [
  {path:"Register",component : RegisterComponent},
  {path:"Login",component : LoginComponent},
  {path:"ResetPassword",component:ResetPasswordComponent},
  {path:"forgetPassword",component:ForgetpasswordComponent},
  {path:"EmailConfirmation",component:EmailConfirmationComponent},
  {path:"productDetails",component:ProductDetailsComponent},
  {path:"productsList",component:ProductsListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
