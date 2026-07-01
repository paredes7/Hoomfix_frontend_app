import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, type TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

type Props = TextInputProps & {
  label?: string;
  hint?: string;
  error?: string;
  isPassword?: boolean;
};

export function Input({ label, hint, error, isPassword = false, ...props }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-[#94A3B8] font-medium mb-1 text-sm tracking-wide">{label}</Text>
      )}
      {hint && (
        <Text className="text-[#475569] text-xs mb-1.5 leading-4">{hint}</Text>
      )}

      <View
        className={`flex-row items-center rounded-xl px-4 border ${
          error ? 'border-[#EF4444] bg-[#1E293B]' : 'border-[#1E3A5F] bg-[#1E293B]'
        }`}
        style={{ minHeight: 52 }}
      >
        <TextInput
          className="flex-1 py-3 text-white text-base"
          placeholderTextColor="#475569"
          secureTextEntry={isPassword && !visible}
          autoCapitalize="none"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setVisible((v) => !v)}
            activeOpacity={0.7}
            className="pl-2"
          >
            {visible
              ? <EyeOff size={20} color="#475569" />
              : <Eye size={20} color="#475569" />
            }
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-[#EF4444] text-xs mt-1.5 ml-1">{error}</Text>
      )}
    </View>
  );
}
