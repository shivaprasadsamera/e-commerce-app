interface RazorpayOptions {
  order_id: string;
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  handler: (response: any) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
}

interface Razorpay {
  new (options: RazorpayOptions): {
    open: () => void;
  };
}

interface Window {
  Razorpay?: Razorpay;
}
