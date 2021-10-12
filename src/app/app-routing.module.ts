import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './private/contact/contact.component';
import { IndexComponent } from './private/index/index.component';
import { MainPrivateComponent } from './private/main/main.component';
import { DetailToTakePatientComponent } from './private/patients/detail/detail.component';
import { TakenPatientComponent } from './private/patients/taken/taken.component';
import { TakePatientComponent } from './private/patients/to-take/take-patient.component';
import { SearchComponent } from './private/search/search.component';
import { AddUserComponent } from './private/user/add/add.component';
import { UsersDetailComponent } from './private/user/detail/detail.component';
import { UsersListComponent } from './private/user/list/list.component';
import { ProfileComponent } from './private/user/profile/profile.component';
import { LoginComponent } from './public/login/login.component';
import { MainPublicComponent } from './public/main/main.component';
import { ForgotPasswordComponent } from './public/password/forgot-password/forgot-password.component';
import { SetPasswordComponent } from './public/password/set-password/set-password.component';
import { AdminGuard } from './shared/services/auth/guard/admin/admin.guard';
import { AuthenticatedGuard } from './shared/services/auth/guard/authenticated/auth.guard';

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
      },
      {
        path: 'set-password/:token',
        component: SetPasswordComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      }
    ]
  },
  {
    path: '',
    canActivate: [AuthenticatedGuard],
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
        path: 'take-patient/:patientRef/:ref',
        component: DetailToTakePatientComponent
      },
      {
        path: 'taken-patient',
        component: TakenPatientComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'users',
        canActivate: [AdminGuard],
        children: [
          {
            path: 'add',
            component: AddUserComponent
          },
          {
            path: '',
            component: UsersListComponent
          },
          {
            path: ':ref',
            component: UsersDetailComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
