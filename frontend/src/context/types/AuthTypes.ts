// client/src/context/types/AuthTypes.ts

export type User = {
  id: string;
  email: string;
  role: 'user' | 'admin';
  name?: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: Date;
};

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    name?: string;
  }) => Promise<void>;
};