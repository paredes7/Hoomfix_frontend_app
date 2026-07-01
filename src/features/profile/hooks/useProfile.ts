import { useAuth } from '@/context/AuthContext';

export function useProfile() {
  const { user, logout } = useAuth();

  const firstName = user?.profile?.firstName ?? '';
  const lastName  = user?.profile?.lastName  ?? '';

  const fullName = firstName && lastName
    ? `${firstName} ${lastName}`
    : user?.username ?? 'Usuario';

  const initials = firstName && lastName
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : (user?.username?.[0] ?? 'U').toUpperCase();

  return {
    user,
    fullName,
    initials,
    logout,
  };
}
