import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './private/index/index.component';
import { MainPrivateComponent } from './private/main/main.component';
import { DetailToTakePatientComponent } from './private/patients/detail/detail.component';
import { TakenPatientComponent } from './private/patients/taken/taken.component';
import { TakePatientComponent } from './private/patients/to-take/take-patient.component';
import { ProfileComponent } from './private/user/profile/profile.component';
import { LoginComponent } from './public/login/login.component';
import { MainPublicComponent } from './public/main/main.component';
import { AuthGuard } from './shared/services/auth/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: MainPublicComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainPrivateComponent,
    children: [
      {
        path: 'home',
        component: IndexComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'take-patient',
        component: TakePatientComponent
      },
      {
        path: 'take-patient/:id',
        component: DetailToTakePatientComponent
      },
      {
        path: 'taken-patient',
        component: TakenPatientComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
