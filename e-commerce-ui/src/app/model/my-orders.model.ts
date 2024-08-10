import { Product } from './product.model';
import { User } from './user.model';

export interface MyOrders {
  orderId: number;
  orderFullName: string;
  orderFullAddress: string;
  orderContactNumber: string;
  orderAlternateContactNumber: string;
  orderAmount: number;
  orderStatus: string;
  product: Product;
  user: User;
}
