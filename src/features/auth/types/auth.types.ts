import type { User } from './user.types';

export type AuthResponse = {
  access_token: string;
  user: User;
};

export type GooglePendingResponse = {
  needsRegistration: true;
  tempToken: string;
  googleEmail: string;
  firstName: string;
  lastName: string;
  suggestedUsername: string;
};
