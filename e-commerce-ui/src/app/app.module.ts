import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './services/user.service';
import { UserAuthService } from './services/user-auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { MatTableModule } from '@angular/material/table';
import { ShowProductImagesDialogComponent } from './show-product-images-dialog/show-product-images-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CartComponent } from './cart/cart.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllOrdersInfoComponent } from './all-orders-info/all-orders-info.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AllUsersComponent } from './all-users/all-users.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ContactedUsersComponent } from './contacted-users/contacted-users.component';
import { IndianNumberPipe } from './custom-pipes/indian-number.pipe';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    ForbiddenComponent,
    AddNewProductComponent,
    DragDirective,
    ShowProductDetailsComponent,
    ShowProductImagesDialogComponent,
    ProductViewDetailsComponent,
    BuyProductComponent,
    OrderConfirmationComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    ContactUsComponent,
    RegisterComponent,
    CartComponent,
    MyOrdersComponent,
    AllOrdersInfoComponent,
    AllUsersComponent,
    ContactedUsersComponent,
    IndianNumberPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatPaginator,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatStepperModule,
    MatCardModule,
    MatSelectModule,
    MatSliderModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: 'authGuard', useValue: authGuard },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    UserService,
    UserAuthService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
