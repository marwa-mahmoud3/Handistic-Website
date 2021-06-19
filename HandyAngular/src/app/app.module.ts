import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
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
import { CreateShopComponent } from './create-shop/create-shop.component';
import { OurServicesComponent } from './home/our-services/our-services.component';
import { HeaderBeforeLoginComponent } from './header-before-login/header-before-login.component';
import { HeaderAfterLoginComponent } from './header-after-login/header-after-login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CartComponent } from './cart/cart.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { OffersComponent } from './offers/offers.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { SellerNavbarComponent } from './seller-navbar/seller-navbar.component';
import { NotificationComponent } from './notification/notification.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UserNavbarComponent } from './user-navbar/user-navbar.component';
import { ClientNotifyComponent } from './client-notify/client-notify.component';
import { BestsellingComponent } from './bestselling/bestselling.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
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
    CreateShopComponent,
    TopbarComponent,
    HeaderBeforeLoginComponent,
    HeaderAfterLoginComponent,
    UserProfileComponent,
    SellerProfileComponent,
    CartComponent,
    WishlistComponent,
    ContactUSComponent,
    AboutUSComponent,
    CheckoutComponent,
    OffersComponent,
    UpdateProductComponent,
    ProductDetailsComponent,
    AddReviewComponent,
    SellerNavbarComponent,
    NotificationComponent,
    OrderDetailsComponent,
    UserNavbarComponent,
    ClientNotifyComponent,
    BestsellingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgSelectModule,
    Ng2SearchPipeModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
