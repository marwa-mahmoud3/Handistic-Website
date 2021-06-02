import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ForgetpasswordComponent } from './authentication/forgetpassword/forgetpassword.component';
import { EmailConfirmationComponent } from './authentication/email-confirmation/email-confirmation.component';
<<<<<<< Updated upstream
import { ProductsComponent } from './products/products.component';
=======
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
>>>>>>> Stashed changes
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { HomeComponent } from './home/home.component';
import { HomeSliderComponent } from './home/home-slider/home-slider.component';
import { HomeDealsComponent } from './home/home-deals/home-deals.component';
import { HomeNewsComponent } from './home/home-news/home-news.component';
import { HomeDiscountsComponent } from './home/home-discounts/home-discounts.component';
import { SiteReviewsComponent } from './home/site-reviews/site-reviews.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ResetPasswordComponent,
    ForgetpasswordComponent,
    EmailConfirmationComponent,
<<<<<<< Updated upstream
    ProductsComponent,
    ProductsListComponent,
    ProductDetailsComponent,
=======
    AdminDashboardComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    HomeComponent,
    HomeSliderComponent,
    HomeDealsComponent,
    HomeNewsComponent,
    HomeDiscountsComponent,
    SiteReviewsComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [ 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
