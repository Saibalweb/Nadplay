import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { getRequest } from '../../../hooks/reqBuilder';
import {
  API_KEY,
  fetchMovieByGenreUrl,
  fetchMoviesByLanguageUrl,
} from '../../../constants/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieCard from '@/components/MovieCard';

const { width } = Dimensions.get('window');

const ExploreResultsScreen = () => {
  const router = useRouter();
  const { type, id, title } = useLocalSearchParams<{ type: string; id: string; title: string }>();

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, [type, id]);

  const fetchMovies = async () => {
    setLoading(true);
    let url = '';
    
    if (type === 'genre') {
      url = fetchMovieByGenreUrl(Number(id), 1);
    } else if (type === 'language') {
      url = fetchMoviesByLanguageUrl(id, 1);
    }

    if (url) {
      const data = await getRequest(url, {}, API_KEY);
      if (data && data.results) {
        setMovies(data.results);
      }
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#111318]">
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-[#584238]/10">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2 bg-[#1e2024] rounded-xl"
        >
          <ChevronLeftIcon size={24} color="#ffb692" />
        </TouchableOpacity>
        <View className="ml-4">
          <Text className="text-xl font-bold text-[#e2e2e8]">
            {title || 'Explore'}
          </Text>
          <Text className="text-xs text-[#dfc0b3] uppercase tracking-widest">
            {type === 'genre' ? 'Genre' : 'Language'}
          </Text>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ffb692" />
        </View>
      ) : (
        <ScrollView 
          className="flex-1 px-4 pt-6" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View className="flex-row flex-wrap justify-between">
            {movies.map((item) => (
              <MovieCard
                key={item.id}
                item={item}
                width={width * 0.44}
                height={260}
                containerClass="mb-6"
              />
            ))}
          </View>
          
          {movies.length === 0 && (
            <View className="items-center mt-20">
              <Text className="text-[#dfc0b3] text-lg">No movies found</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ExploreResultsScreen;
