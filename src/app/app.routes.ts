import { Routes } from '@angular/router';
import { ProductlistComponent } from './productlist/productlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { OrderComponent } from './order/order.component';
import {AddproductComponent} from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth/auth.guard';

export const APP_ROUTES: Routes = [
  { path: 'products', component:  ProductlistComponent},
  { path: 'orders', component:  OrderComponent,canActivate: [AuthGuard]},
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  {path:'addProduct',component:AddproductComponent,canActivate: [AuthGuard]},
  {path:'editProduct/:id',component:EditproductComponent,canActivate: [AuthGuard]},
  {path:'signup',component:SignupComponent },
  {path:'login',component:LoginComponent},
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];
