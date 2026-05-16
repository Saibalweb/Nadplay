import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { router } from 'expo-router';
import { API_IMAGE_URL } from '@/constants/api';


interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

interface MovieCardProps {
  item: Movie;
  onPress?: () => void;
  width?: number;
  height?: number;
  containerClass?: string;
  imageClass?: string;
  type?: 'movie' | 'tv';
}

const MovieCard: React.FC<MovieCardProps> = ({ 
  item, 
  onPress, 
  width = 150,
  height = 220,
  containerClass = "",
  imageClass = "",
  type = 'movie'
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Determine type if not explicitly provided
      const finalType = type || (item.title ? 'movie' : 'tv');
      router.push(`/${finalType}/${item.id}`);
    }
  };

  const title = item.title || item.name;
  const imageUrl = item.poster_path 
    ? `${API_IMAGE_URL}${item.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const year = (item.release_date || item.first_air_date)?.split('-')[0];

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`${containerClass}`}
      style={{ width: width }}
      activeOpacity={0.7}
    >
      <View className="relative shadow-lg shadow-black">
        <Image
          source={{ uri: imageUrl }}
          style={{ width: width, height: height }}
          className={`rounded-2xl ${imageClass}`}
          resizeMode="cover"
        />
        {item.vote_average ? (
          <View className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded-lg flex-row items-center">
            <Text className="text-yellow-500 text-xs font-bold">★ {item.vote_average.toFixed(1)}</Text>
          </View>
        ) : null}
      </View>
      <View className="mt-2 px-1">
        <Text className="text-surface font-semibold text-base" numberOfLines={1}>
          {title}
        </Text>
        {year && (
          <Text className="text-gray-500 text-sm mt-0.5">
            {year}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;
