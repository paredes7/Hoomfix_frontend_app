import { ScrollView } from 'react-native';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { ProfileInfo } from '@/features/profile/components/ProfileInfo';
import { ProfileStats } from '@/features/profile/components/ProfileStats';
import { ProfileMenu } from '@/features/profile/components/ProfileMenu';
import { useActiveProfile } from '@/context/ActiveProfileContext';
import { ProviderProfileView } from '@/features/providerProfile/screens/ProviderProfileView';

export default function ProfileScreen() {
  const { user, fullName, initials, logout } = useProfile();
  const { activeServiceId } = useActiveProfile();

  if (activeServiceId) {
    return <ProviderProfileView serviceId={activeServiceId} />;
  }

  return (
    <ScrollView className="flex-1 bg-[#060F1E]">
      <ProfileHeader
        fullName={fullName}
        username={user?.username}
        initials={initials}
      />
      <ProfileInfo />
      <ProfileStats />
      <ProfileMenu onLogout={logout} />
    </ScrollView>
  );
}
