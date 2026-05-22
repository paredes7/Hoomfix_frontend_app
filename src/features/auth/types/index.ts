export type User = {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  role: 'CLIENT' | 'TECHNICIAN' | 'ADMIN';
  avatar: string | null;
};

export type AuthResponse = {
  access_token: string;
  user: User;
};
