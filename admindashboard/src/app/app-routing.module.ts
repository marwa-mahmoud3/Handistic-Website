import { HomeComponent } from './pages/home/home.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { UpdateCityComponent } from './pages/update-city/update-city.component';

const routes: Routes = [
  {path: 'city', component: CitiesComponent},
  {path:'addcity',component:AddCityComponent},
  {path:'addcategory',component:AddCategoryComponent},
  {path:'updatecity/:id',component:UpdateCityComponent},
  {path:'updatecategory/:id',component:UpdateCategoryComponent},
  {path:'category',component:CategoriesComponent},
  {path:'Home',component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
