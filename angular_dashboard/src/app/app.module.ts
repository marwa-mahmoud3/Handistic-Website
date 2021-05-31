import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { ChartsModule } from 'ng2-charts';
import { CardoverviewComponent } from './components/cardoverview/cardoverview.component';
import { SearchselectformComponent } from './components/searchselectform/searchselectform.component';
import { DocscComponent } from './components/docsc/docsc.component';
import { ProgressComponent } from './components/progress/progress.component';
import { StatlistComponent } from './components/statlist/statlist.component';
import { CreateappComponent } from './components/createapp/createapp.component';
import { Createapp2Component } from './components/createapp2/createapp2.component';
import { Createapp3Component } from './components/createapp3/createapp3.component';
import { Cardoverview2Component } from './components/cardoverview2/cardoverview2.component';
import { Cardoverview3Component } from './components/cardoverview3/cardoverview3.component';
import { Cardoverview4Component } from './components/cardoverview4/cardoverview4.component';
import { BarlinechartComponent } from './components/barlinechart/barlinechart.component';
import { SignupComponent } from './pages/external/signup/signup.component';
import { TwolinechartComponent } from './components/twolinechart/twolinechart.component';
import { ResetPaswordComponent } from './pages/external/reset-pasword/reset-pasword.component';
import { ErrorPageComponent } from './pages/external/error-page/error-page.component';
import { SigninComponent } from './pages/external/signin/signin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { SecurityComponent } from './components/security/security.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { GeneralComponent } from './components/general/general.component';
import { PlanComponent } from './components/plan/plan.component';
import { DataPrivacyComponent } from './components/data-privacy/data-privacy.component';
import { NotificationSettingsComponent } from './components/notification-settings/notification-settings.component';
import { HelpComponent } from './pages/help/help.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { ClientListComponent } from './pages/client-list/client-list.component';
import { TalentListComponent } from './pages/talent-list/talent-list.component';
import { AddadminComponent } from './components/addadmin/addadmin.component';
import { ListsofadminsComponent } from './components/listsofadmins/listsofadmins.component';
import { CommonModule } from '@angular/common';
import { EditadminComponent } from './components/editadmin/editadmin.component';
import { Signup2Component } from './pages/signup2/signup2.component';
import { SpecialaccountComponent } from './pages/specialaccount/specialaccount.component';
import { Profile1Component } from './components/profile1/profile1.component';
import { ResetpassformComponent } from './pages/resetpassform/resetpassform.component';
import { OrdersComponent } from './pages/orders/orders.component';
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    OverviewComponent,
    ChartsComponent,
    LineChartComponent,
    PieChartComponent,
    BarChartComponent,
    DoughnutChartComponent,
    CardoverviewComponent,
    SearchselectformComponent,
    DocscComponent,
    ProgressComponent,
    StatlistComponent,
    CreateappComponent,
    Createapp2Component,
    Createapp3Component,
    CardoverviewComponent,
    Cardoverview2Component,
    Cardoverview3Component,
    Cardoverview4Component,
    BarlinechartComponent,
    SignupComponent,
    TwolinechartComponent,
    SigninComponent,
    ResetPaswordComponent,
    HelpComponent,
    NotificationsComponent,
    SettingsComponent,
    NotificationComponent,
    PreferencesComponent,
    SecurityComponent,
    PaymentMethodComponent,
    GeneralComponent,
    PlanComponent,
    DataPrivacyComponent,
    NotificationSettingsComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    OrdersComponent,
    ClientListComponent,
    TalentListComponent,
    AddadminComponent,
    ListsofadminsComponent,
    EditadminComponent,
    Signup2Component,
    SpecialaccountComponent,
    Profile1Component,
    ResetpassformComponent,
  
  ],
  imports: [
  AngularFireDatabaseModule,
  BrowserModule,
  AppRoutingModule,
  ChartsModule,
  FormsModule,
  AngularFireModule.initializeApp(environment.firebase),
  ReactiveFormsModule,
  AngularFireDatabaseModule,
  AngularFirestoreModule,
  AngularFireStorageModule,  
],
  exports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
