import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { MainPublicComponent } from './public/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { MainPrivateComponent } from './private/main/main.component';
import { IndexComponent } from './private/index/index.component';
import { NgChartsModule } from 'ng2-charts';
import { TakePatientComponent } from './private/patients/to-take/take-patient.component';
import { DetailToTakePatientComponent } from './private/patients/detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPublicComponent,
    SideBarComponent,
    MainPrivateComponent,
    IndexComponent,
    TakePatientComponent,
    DetailToTakePatientComponent
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
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
