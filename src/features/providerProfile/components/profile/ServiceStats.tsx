import { View, Text } from 'react-native';
import { Star } from 'lucide-react-native';

type Props = {
    rating: number;
    totalRatings: number;
    serviceTypeName: string;
    countryName: string;
};

export function ServiceStats({ rating, totalRatings, serviceTypeName, countryName }: Props) {
    return (
        <View>
            <View className="flex-row items-center gap-1.5 mt-1.5">
                <Star size={14} color="#F97316" fill="#F97316" />
                <Text className="text-[#F97316] text-sm font-semibold">{rating.toFixed(1)}</Text>
                <Text className="text-[#334155] text-sm">·</Text>
                <Text className="text-[#475569] text-sm">{totalRatings} reseñas</Text>
            </View>
            <Text className="text-[#475569] text-sm mt-0.5">
                {serviceTypeName} · {countryName}
            </Text>
        </View>
    );
}
