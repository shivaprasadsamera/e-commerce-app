import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', title: 'Home | eShop', component: HomeComponent },
  {
    path: 'admin',
    title: 'Admin | eShop',
    component: AdminComponent,
  },
  {
    path: 'user',
    title: 'User | eShop',
    component: UserComponent,
  },
  { path: 'login', title: 'Login | eShop', component: LoginComponent },
  {
    path: 'forbidden',
    title: 'Forbidden | eShop',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    title: 'Pagenotfound ',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
