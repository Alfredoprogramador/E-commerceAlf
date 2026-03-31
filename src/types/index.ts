export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    images: string;
    stock: number;
  };
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAt: number | null;
  stock: number;
  images: string;
  featured: boolean;
  category: { id: string; name: string; slug: string };
  reviews?: Review[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
};

export type Order = {
  id: string;
  status: string;
  total: number;
  subtotal: number;
  shipping: number;
  createdAt: Date;
  items: OrderItem[];
  address?: Address | null;
};

export type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { id: string; name: string; images: string };
};

export type Address = {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
};

export type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: { name: string | null };
};
