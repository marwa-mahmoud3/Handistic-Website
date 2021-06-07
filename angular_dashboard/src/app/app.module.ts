import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CityComponent } from './pages/city/city.component';
import { CategoryComponent } from './pages/category/category.component';
import { UpdatecategoryComponent } from './pages/updatecategory/updatecategory.component';
import { UpdatecityComponent } from './pages/updatecity/updatecity.component';
import { AddcategoryComponent } from './pages/addcategory/addcategory.component';
import { AddcityComponent } from './pages/addcity/addcity.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CityComponent,
    CategoryComponent,
    UpdatecategoryComponent,
    UpdatecityComponent,
    AddcategoryComponent,
    AddcityComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgModule,
    HttpClientModule,
    NgForm
],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
