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
import { SiteReiewsComponent } from './home/site-reiews/site-reiews.component';
import { HomeDealsComponent } from './home/home-deals/home-deals.component';
import { HomeDiscountsComponent } from './home/home-discounts/home-discounts.component';
import { HomeNewsComponent } from './home/home-news/home-news.component';
import { HomeSliderComponent } from './home/home-slider/home-slider.component';
import { HomeComponent } from './home/home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HandmadeProductComponent } from './handmade-product/handmade-product.component';
import { OurServicesComponent } from './home/our-services/our-services.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';

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
    HomeComponent,
    HomeDealsComponent,
    HomeDiscountsComponent,
    HomeNewsComponent,
    HomeSliderComponent,
    SiteReiewsComponent,
    ProfileComponent,
    TopbarComponent,
    HandmadeProductComponent,
    OurServicesComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
