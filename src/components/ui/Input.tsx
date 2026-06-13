import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, type TextInputProps } from 'react-native';

type Props = TextInputProps & {
  label?: string;
  error?: string;
  isPassword?: boolean;
};

export function Input({ label, error, isPassword = false, ...props }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-[#0F172A] font-medium mb-1 text-sm">{label}</Text>
      )}

      <View className={`flex-row items-center border rounded-xl px-4 bg-white ${error ? 'border-[#EF4444]' : 'border-[#E2E8F0]'}`}>
        <TextInput
          className="flex-1 py-3 text-[#0F172A] text-base"
          placeholderTextColor="#CBD5E1"
          secureTextEntry={isPassword && !visible}
          autoCapitalize="none"
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setVisible((v) => !v)} activeOpacity={0.7}>
            <Text className="text-[#64748B] text-sm">{visible ? 'Ocultar' : 'Ver'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-[#EF4444] text-xs mt-1">{error}</Text>
      )}
    </View>
  );
}
