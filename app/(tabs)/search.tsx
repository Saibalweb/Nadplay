import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';
import { getRequest } from '../../hooks/reqBuilder';
import {
  API_KEY,
  API_IMAGE_URL,
  searchMoviesUrl,
  fetchTrendingUrl,
} from '../../constants/api';
import MovieCard from '@/components/MovieCard';

const { width } = Dimensions.get('window');

const SearchScreen = () => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const recentSearches = ['Inception', 'The Dark Knight', 'Interstellar'];


  const genres = [
    { id: 28, title: 'Action', image: 'https://images.unsplash.com/photo-1568870615365-214339636af3?q=80&w=500&auto=format&fit=crop', color: 'bg-orange-500/60' },
    { id: 35, title: 'Comedy', image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=500&auto=format&fit=crop', color: 'bg-blue-500/60' },
    { id: 18, title: 'Drama', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop', color: 'bg-purple-500/60' },
    { id: 27, title: 'Horror', image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500&auto=format&fit=crop', color: 'bg-red-500/60' },
    { id: 878, title: 'Sci-Fi', image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=500&auto=format&fit=crop', color: 'bg-teal-500/60' },
    { id: 53, title: 'Thriller', image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95ccd50?q=80&w=500&auto=format&fit=crop', color: 'bg-gray-800/60' },
  ];

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' },
    { name: 'French', code: 'fr' },
    { name: 'Japanese', code: 'ja' },
    { name: 'Korean', code: 'ko' },
    { name: 'Hindi', code: 'hi' },
  ];

  useEffect(() => {
    fetchTrending();
  }, []);

  const fetchTrending = async () => {
    setLoading(true);
    const data = await getRequest(fetchTrendingUrl(),{},API_KEY);
    if (data && data.results) {
      setTrendingMovies(data.results);
    }
    setLoading(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      setSearching(true);
      const data = await getRequest(searchMoviesUrl(query), {},API_KEY );
      if (data && data.results) {
        setSearchResults(data.results);
      }
      setSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const handleGenrePress = (genreId, genreTitle) => {
    router.push(`/explore/genre/${genreId}?title=${genreTitle}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header & Search Bar */}
        <View className="mt-6 mb-8">
          <Text className="text-3xl font-bold text-surface mb-6">Search</Text>
          <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 border border-outline/10">
            <MagnifyingGlassIcon size={24} color="black" />
            <TextInput
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Movies, actors, genres..."
              placeholderTextColor="black"
              className="flex-1 ml-3 text-surface text-lg font-medium"
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <XMarkIcon size={24} color="black" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <MicrophoneIcon size={24} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {searchQuery.length > 2 ? (
          <View className="mb-8">
            <Text className="text-xl font-semibold text-surface mb-4">Results</Text>
            {searching ? (
              <ActivityIndicator color="var(--primary)" size="large" />
            ) : (
              <View className="flex-row flex-wrap justify-between">
                {searchResults.map((item) => (
                  <MovieCard
                    key={item.id}
                    item={item}
                    width={width * 0.44}
                    height={260}
                    containerClass="mb-4"
                  />
                ))}
              </View>
            )}
            {!searching && searchResults.length === 0 && (
              <Text className="text-surface-variant text-center mt-10">No results found for "{searchQuery}"</Text>
            )}
          </View>
        ) : (
          <>
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-semibold text-surface">Recent Searches</Text>
                <TouchableOpacity>
                  <Text className="text-primary text-sm">Clear All</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {recentSearches.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => handleSearch(item)}>
                    <View className="flex-row items-center bg-white px-4 py-2 rounded-full border border-outline/20 items-center justify-center ">
                      <Text className="text-black mr-2">{item}</Text>
                      <XMarkIcon size={16} color="black" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="mb-8">
              <Text className="text-xl font-semibold text-surface mb-4">Trending Now</Text>
              {loading ? (
                <ActivityIndicator color="var(--primary)" />
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                  {trendingMovies.map((item,index) => {
                    if(index>5 || !item.poster_path) return null;
                    return(
                      <MovieCard
                        key={item.id}
                        item={item}
                        width={160}
                        height={224}
                        containerClass="mr-4"
                      />
                  )
                })}
                </ScrollView>
              )}
            </View>

            {/* Explore by Genre */}
            <View className="mb-8">
              <Text className="text-xl font-semibold text-surface mb-4">Explore by Genre</Text>
              <View className="flex-row flex-wrap gap-3">
                {genres.map((genre, index) => (
                  <TouchableOpacity
                    key={index}
                    className="w-[47%] h-32 rounded-2xl overflow-hidden mb-1"
                    onPress={() => handleGenrePress(genre.id, genre.title)}
                  >
                    <Image source={{ uri: genre.image }} className="w-full h-full" resizeMode="cover" />
                    <View className={`absolute inset-0 items-center justify-center backdrop-blur-sm ${genre.color}`}>
                      <Text className="text-white font-bold uppercase tracking-widest text-lg">{genre.title}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Explore by Language */}
            <View className="mb-12">
              <Text className="text-xl font-semibold text-surface mb-4">Explore by Language</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                {languages.map((lang, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-surface-container px-8 py-4 rounded-2xl mr-3 border border-outline/10"
                    onPress={() => router.push(`/explore/language/${lang.code}?title=${lang.name}`)}
                  >
                    <Text className="text-surface font-medium">{lang.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
