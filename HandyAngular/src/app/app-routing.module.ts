import { ClientNotifyComponent } from './client-notify/client-notify.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { NotificationComponent } from './notification/notification.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { OffersComponent } from './offers/offers.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutUSComponent } from './about-us/about-us.component';
import { ContactUSComponent } from './contact-us/contact-us.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SellerProfileComponent } from './seller-profile/seller-profile.component';
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
import { CartComponent } from './cart/cart.component';


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
  {path:"profile",component:ProfileComponent},
  {path: "HandmadeProducts",component:HandmadeProductComponent},
  {path:"CreateShop",component:CreateShopComponent},
  {path: "SellerProfile" , component:SellerProfileComponent},
  {path :"UserProfile" , component:UserProfileComponent},
  {path :"Cart" , component:CartComponent},
  {path :"Wishlist",component:WishlistComponent},
  {path : "ContactUs" ,component:ContactUSComponent},
  {path : "AboutUS" ,component:AboutUSComponent},
  {path :"Checkout" ,component:CheckoutComponent},
  {path :"Offers" ,component:OffersComponent},
  {path :"EditProduct/:id" ,component:UpdateProductComponent},
  {path :"ProductDetails/:id" ,component:ProductDetailsComponent},
  {path :"AddReview/:billingid" ,component:AddReviewComponent},
  {path :"notification" ,component:NotificationComponent},
  {path:"orderDetails",component:OrderDetailsComponent},
  {path:"notify",component:ClientNotifyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
