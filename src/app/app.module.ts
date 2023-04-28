import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { MainPublicComponent } from './public/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { MainPrivateComponent } from './private/main/main.component';
import { IndexComponent } from './private/index/index.component';
import { NgChartsModule } from 'ng2-charts';
import { TakePatientComponent } from './private/patients/to-take/take-patient.component';
import { DetailToTakePatientComponent } from './private/patients/detail/detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProfileComponent } from './private/user/profile/profile.component';
import { TakenPatientComponent } from './private/patients/taken/taken.component';
import { UsersListComponent } from './private/user/list/list.component';
import { UsersDetailComponent } from './private/user/detail/detail.component';
import { AddUserComponent } from './private/user/add/add.component';
import { SetPasswordComponent } from './public/password/set-password/set-password.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ForgotPasswordComponent } from './public/password/forgot-password/forgot-password.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ErrorMobileComponent } from './shared/components/modal/error-mobile/error-mobile.component';
import { ModalFillTestComponent } from './private/patients/detail/modal-fill-test/modal-fill-test.component';
import { ContactComponent } from './private/contact/contact.component';
import { SearchComponent } from './private/search/search/search.component';
import { SearchHistoryComponent } from './private/search/search-history/search-history.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserExportRequestComponent } from './shared/components/user-export/request/request.component';
import { UserExportListComponent } from './shared/components/user-export/list/list.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPublicComponent,
    SideBarComponent,
    MainPrivateComponent,
    IndexComponent,
    TakePatientComponent,
    DetailToTakePatientComponent,
    ProfileComponent,
    TakenPatientComponent,
    UsersListComponent,
    UsersDetailComponent,
    AddUserComponent,
    SetPasswordComponent,
    ToastComponent,
    ForgotPasswordComponent,
    ErrorMobileComponent,
    ModalFillTestComponent,
    ContactComponent,
    SearchComponent,
    SearchHistoryComponent,
    UserExportRequestComponent,
    UserExportListComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    NgChartsModule,
    BsDatepickerModule.forRoot(),
    FontAwesomeModule,
    ModalModule.forRoot(),
    NgSelectModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
