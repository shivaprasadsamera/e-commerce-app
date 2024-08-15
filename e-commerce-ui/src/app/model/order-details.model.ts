import { OrderQuantity } from './order-quantity.model';

export interface OrderDetails {
  fullName: string;
  fullAddress: string;
  contactNumber: string;
  alternateContactNumber: string;
  razorpay_payment_id: string;
  razorpay_order_id:string;
  razorpay_signature:string;
  orderProductQuantityList: OrderQuantity[];
}
