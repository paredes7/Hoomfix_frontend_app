import { useAuth } from '@/context/AuthContext';

export function useInfo() {
    const { user } = useAuth();

    const phone = user?.profile?.contacts?.[0]?.phone ?? user?.phone ?? null;
    const pais = (user?.profile as any)?.country?.name ?? user?.profile?.countryIso ?? null;
    return {
        email: user?.email ?? null,
        username: user?.username ?? null,
        phone,
        countryIso: user?.profile?.countryIso ?? null,
        pais,
        isActive: user?.isActive ?? false,
        balance: user?.profile?.wallet?.balance ?? 0,
        currency: user?.profile?.wallet?.currency ?? 'BOB',
    };
}
