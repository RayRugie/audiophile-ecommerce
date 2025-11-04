// Product types
export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'headphones' | 'speakers' | 'earphones';
  categoryImage: string;
  new: boolean;
  price: number;
  description: string;
  features: {
    text1?: string;
    text2?: string;
  }[];
  includes: {
    quantity: number;
    item: string;
  }[];
  gallery: {
    first: string;
    second: string;
    third: string;
  };
  others: {
    slug: string;
    name: string;
    image: string;
  }[];
}

// Cart item
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Order types
export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface PaymentDetails {
  method: 'cash' | 'e-money';
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
  total: number;
  shipping: number;
  vat: number;
  grandTotal: number;
  createdAt: number;
}

// Form types
export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  paymentMethod: 'cash' | 'e-money';
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

