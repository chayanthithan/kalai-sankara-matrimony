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
import { ContactComponent } from './pages/contact/contact.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { DeleteConfirmationDialogComponent } from './popup/delete-confirmation-dialog/delete-confirmation-dialog.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'reviews', component: ReviewsComponent },
      { path: 'matrimony-details', component: MatrimonyComponent },
      { path: 'home', component: HomeComponent },
    ]
  },
  {
    path: 'auth',
    component: EmptyLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'addpost', component: AddpostComponent },
      { path: 'addpost/:id', component: AddpostComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'delete', component: DeleteConfirmationDialogComponent },
    ]
  },
];

