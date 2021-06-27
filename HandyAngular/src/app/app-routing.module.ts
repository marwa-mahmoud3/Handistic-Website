import { TopRatedComponent } from './top-rated/top-rated.component';
import { ClientsComponent } from './clients/clients.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ChatComponent } from './chat/chat.component';
import { BestsellingComponent } from './bestselling/bestselling.component';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { RecommendedProductsComponent } from './recommended-products/recommended-products.component';


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
  {path:"profile",component:ProfileComponent},
  {path: "HandmadeProducts/:id",component:HandmadeProductComponent},
  {path:"CreateShop",component:CreateShopComponent},
  {path: "SellerProfile/:userName" , component:SellerProfileComponent},
  {path :"UserProfile/:userName" , component:UserProfileComponent},
  {path :"Cart" , component:CartComponent},
  {path :"Wishlist",component:WishlistComponent},
  {path : "ContactUs" ,component:ContactUSComponent},
  {path : "AboutUS" ,component:AboutUSComponent},
  {path :"Checkout" ,component:CheckoutComponent},
  {path :"Offers/:id" ,component:OffersComponent},
  {path :"EditProduct/:id" ,component:UpdateProductComponent},
  {path :"ProductDetails/:id" ,component:ProductDetailsComponent},
  {path :"AddReview/:billingid/:SellerName" ,component:AddReviewComponent},
  {path :"notification" ,component:NotificationComponent},
  {path:"orderDetails/:id",component:OrderDetailsComponent},
  {path:"notify",component:ClientNotifyComponent},
  {path:"bestSelleing",component:BestsellingComponent},
  {path:"Chat",component:ChatComponent},
  {path:"searchResult/:searchKey",component:SearchResultComponent},
  {path:"dashboard" ,component :DashboardComponent},
  {path :"CategoryProducts/:id",component:CategoryComponent},
  {path :"Clients",component:ClientsComponent},
  {path :"topRated",component:TopRatedComponent},
  {path:"recommendedProduct",component:RecommendedProductsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
