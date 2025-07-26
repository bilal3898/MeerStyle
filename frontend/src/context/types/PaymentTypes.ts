// client/src/context/types/PaymentTypes.ts

export type PaymentMethod = {
  id: string;
  type: 'card' | 'wallet' | 'netbanking';
  last4?: string;
  brand?: string;
  walletName?: string;
  bankName?: string;
  isDefault: boolean;
};

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: Date;
  paymentMethodId: string;
};

export type PaymentContextType = {
  methods: PaymentMethod[];
  transactions: Transaction[];
  selectedMethod: string | null;
  loading: boolean;
  error: string | null;
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => Promise<void>;
  removePaymentMethod: (methodId: string) => Promise<void>;
  processPayment: (amount: number) => Promise<Transaction>;
};