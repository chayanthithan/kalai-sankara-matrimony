import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { MatrimonyComponent } from './pages/matrimony/matrimony.component';
import { AddpostComponent } from './pages/admin/addpost/addpost.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: '**', redirectTo: 'home' }
    ]
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'admin/addpost', component: AddpostComponent },
      { path: 'admin/dashboard', component: DashboardComponent },
    ]
  },
];

