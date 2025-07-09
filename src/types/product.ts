export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
  featured?: boolean;
}

export interface Order {
  id: number;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderNumber: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
  productName: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalSpent: number;
  pendingOrders: number;
  favoriteProducts: number;
}