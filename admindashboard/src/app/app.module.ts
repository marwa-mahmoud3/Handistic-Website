import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AddCityComponent } from './pages/add-city/add-city.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { UpdateCityComponent } from './pages/update-city/update-city.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    CitiesComponent,
    CategoriesComponent,
    AddCityComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    UpdateCityComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
