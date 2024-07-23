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
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';

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
    path: 'forbidden',
    title: 'Forbidden | eShop',
    component: ForbiddenComponent,
  },
  {
    path: 'addNewProduct',
    title: 'addNewProduct | eShop',
    component: AddNewProductComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'showProductDetails',
    title: 'showProductDetails | eShop',
    component: ShowProductDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
