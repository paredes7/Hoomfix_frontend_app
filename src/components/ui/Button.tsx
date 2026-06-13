import { ActivityIndicator, Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { Colors } from '@/constants/colors';

type Variant = 'primary' | 'secondary' | 'outline';

type Props = TouchableOpacityProps & {
  label: string;
  variant?: Variant;
  loading?: boolean;
};

const styles: Record<Variant, { container: string; text: string }> = {
  primary: {
    container: 'bg-[#2563EB] rounded-xl py-4 items-center',
    text: 'text-white font-bold text-base',
  },
  secondary: {
    container: 'bg-[#F97316] rounded-xl py-4 items-center',
    text: 'text-white font-bold text-base',
  },
  outline: {
    container: 'border border-[#2563EB] rounded-xl py-4 items-center',
    text: 'text-[#2563EB] font-bold text-base',
  },
};

export function Button({ label, variant = 'primary', loading = false, disabled, ...props }: Props) {
  const s = styles[variant];
  const isDisabled = disabled ?? loading;

  return (
    <TouchableOpacity
      className={`${s.container} ${isDisabled ? 'opacity-50' : ''}`}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading
        ? <ActivityIndicator color={Colors.white} />
        : <Text className={s.text}>{label}</Text>
      }
    </TouchableOpacity>
  );
}
