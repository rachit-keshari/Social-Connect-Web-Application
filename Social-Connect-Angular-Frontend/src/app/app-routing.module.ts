import { LogoutGuard } from './services/logout.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [

  {
    path:'signup',
    component: SignupComponent,
    pathMatch: 'full',
    canActivate:[LogoutGuard],
  },
  {
    path:'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate:[LogoutGuard],
  },
  {
    path:'',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate:[LogoutGuard],
  },
  {
    path:'home',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate:[LogoutGuard],
  },
  {
    path:'admin',
    component: AdminDashboardComponent,
    pathMatch: 'full',
    canActivate:[AdminGuard],
  },
  {
    path:'user-dashboard',
    component: UserDashboardComponent,
    pathMatch: 'full',
    canActivate:[NormalGuard],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
