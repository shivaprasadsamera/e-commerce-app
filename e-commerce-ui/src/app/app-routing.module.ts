import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { authGuard } from './auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';

const routes: Routes = [
  { path: '', title: 'Home | eShop', component: HomeComponent },
  {
    path: 'admin',
    title: 'Admin | eShop',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user',
    title: 'User | eShop',
    component: UserComponent,
    canActivate: [authGuard],
    data: { roles: ['User'] },
  },
  { path: 'login', title: 'Login | eShop', component: LoginComponent },
  {
    path: 'addNewProduct',
    title: 'addNewProduct | eShop',
    component: AddNewProductComponent,
  },
  {
    path: 'forbidden',
    title: 'Forbidden | eShop',
    component: ForbiddenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
