export type Product = {
  uuid: string;
  name: string;
  price: number;
  description: string;
  productImage: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};