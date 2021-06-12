import { SellersComponent } from './pages/sellers/sellers.component';
import { HomeComponent } from './pages/home/home.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { UpdateCityComponent } from './pages/update-city/update-city.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { RequestdetailsComponent } from './pages/requestdetails/requestdetails.component';
import { SellerDetailsComponent } from './pages/seller-details/seller-details.component';

const routes: Routes = [
  {path:'',redirectTo:'Home', pathMatch: 'full' },
  {path: 'city', component: CitiesComponent},
  {path:'addcity',component:AddCityComponent},
  {path:'addcategory',component:AddCategoryComponent},
  {path:'updatecity/:id',component:UpdateCityComponent},
  {path:'updatecategory/:id',component:UpdateCategoryComponent},
  {path:'category',component:CategoriesComponent},
  {path:'Home',component:HomeComponent},
  {path:'request',component:RequestsComponent},
  {path:'requestdetails/:id',component:RequestdetailsComponent},
  {path:'sellerdetails/:id',component:SellerDetailsComponent},
  {path:'sellers',component:SellersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
