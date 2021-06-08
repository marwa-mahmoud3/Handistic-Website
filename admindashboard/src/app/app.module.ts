import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { UpdateCityComponent } from './pages/update-city/update-city.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { SellersComponent } from './pages/sellers/sellers.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CitiesComponent,
    CategoriesComponent,
    AddCategoryComponent,
    AddCityComponent,
    UpdateCategoryComponent,
    UpdateCityComponent,
    HomeComponent,
    SellersComponent
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
