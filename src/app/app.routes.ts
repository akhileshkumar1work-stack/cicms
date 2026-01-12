import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { DefaultRoute } from './auth/default-route/default-route';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: 'dashboard',
    loadChildren: () => import('./layout/layout-module').then((x) => x.LayoutModule),
  },
  { path: '**', component: DefaultRoute },
];
