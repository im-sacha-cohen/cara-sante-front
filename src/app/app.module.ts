import { BrowserModule } from '@angular/platform-browser';
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
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { MainPrivateComponent } from './private/main/main.component';
import { IndexComponent } from './private/index/index.component';
import { NgChartsModule } from 'ng2-charts';
import { TakePatientComponent } from './private/take-patient/take-patient.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPublicComponent,
    SideBarComponent,
    MainPrivateComponent,
    IndexComponent,
    TakePatientComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
