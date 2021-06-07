import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './pages/city/city.component';
import { AddcityComponent } from './pages/addcity/addcity.component';
import { UpdatecityComponent } from './pages/updatecity/updatecity.component';
import { CategoryComponent } from './pages/category/category.component';
import { AddcategoryComponent } from './pages/addcategory/addcategory.component';
import { UpdatecategoryComponent } from './pages/updatecategory/updatecategory.component';


const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'city', component: CityComponent},
  {path:'addcity',component:AddcityComponent},
  {path:'addcategory',component:AddcategoryComponent},
  {path:'updatecity/:id',component:UpdatecityComponent},
  {path:'updatecategory/:id',component:UpdatecategoryComponent},
  {path:'category',component:CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
