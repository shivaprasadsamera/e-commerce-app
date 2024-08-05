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
import { ProductResolverService } from './services/product-resolver.service';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './services/buy-product-resolver.service';

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
    resolve: { product: ProductResolverService },
  },
  {
    path: 'showProductDetails',
    title: 'showProductDetails | eShop',
    component: ShowProductDetailsComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'productViewDetails',
    title: 'productViewDetails | eShop',
    component: ProductViewDetailsComponent,
    resolve: { product: ProductResolverService },
  },
  {
    path: 'buyProduct',
    title: 'buyProduct | eShop',
    component: BuyProductComponent,
    canActivate: [authGuard],
    data: { roles: ['User'] },
    resolve: { productdetails: BuyProductResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
