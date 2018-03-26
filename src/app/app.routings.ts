import { AuthGuard } from './helpers/auth.guard';

import { LoginComponent } from './core/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {
    path:'',
    pathMatch : 'full',
    redirectTo : 'dashboard'
  },
  {
    path:'login',
    component : LoginComponent
  },
  {
    path: 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGuard]
  },
  {
    path : '**',

    component : LoginComponent
  }
]

export const routing = RouterModule.forRoot(appRoutes, { enableTracing : true });
