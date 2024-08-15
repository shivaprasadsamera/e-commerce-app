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
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllOrdersInfoComponent } from './all-orders-info/all-orders-info.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ContactedUsersComponent } from './contacted-users/contacted-users.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';

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
    path: 'privacyPolicy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'termsOfService',
    component: TermsOfServiceComponent,
  },
  {
    path: 'contactUs',
    component: ContactUsComponent,
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
  {
    path: 'cart',
    title: 'cart | eShop',
    component: CartComponent,
    canActivate: [authGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'orderConfirm',
    title: 'orderConfirm | eShop',
    component: OrderConfirmationComponent,
    canActivate: [authGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'myOrders',
    title: 'myorders | eShop',
    component: MyOrdersComponent,
    canActivate: [authGuard],
    data: { roles: ['User'] },
  },
  {
    path: 'allOrdersInfo',
    title: 'allorders | eShop',
    component: AllOrdersInfoComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'allUsers',
    title: 'allusers | eShop',
    component: AllUsersComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'contactedUsers',
    title: 'contactedusers | eShop',
    component: ContactedUsersComponent,
    canActivate: [authGuard],
    data: { roles: ['Admin'] },
  },
  { path: 'register', component: RegisterComponent },
  { path: 'imageGallery', component: ImageGalleryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
