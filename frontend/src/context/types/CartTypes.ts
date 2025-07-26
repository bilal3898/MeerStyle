// client/src/context/types/CartTypes.ts

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
  size?: string;
  color?: string;
  maxQuantity: number;
  productId: string;
};

export type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<void>;
};