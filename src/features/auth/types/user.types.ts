export type Wallet = {
  currency: string;
  balance: number;
};

export type Contact = {
  id: string;
  phone: string;
};

export type Profile = {
  id: string;
  countryIso: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  lastLoginAt?: string;
  contacts?: Contact[];
  wallet?: Wallet;
};

export type Country = {
  iso: string;
  name: string;
};

export type User = {
  id: string;
  email: string | null;
  phone: string | null;
  username: string;
  isActive: boolean;
  isOnboardingComplete: boolean;
  profile: Profile | null;
  country: Country | null;
};
