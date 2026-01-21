import { Routes } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { TasksComponent } from './components/pages/dashboard/tasks/tasks.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
