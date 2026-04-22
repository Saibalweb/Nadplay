import React, { useState, useEffect, useCallback } from 'react';
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
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';
import { getRequest } from '../../hooks/reqBuilder';
import {
  API_KEY,
  API_IMAGE_URL,
  searchMoviesUrl,
  fetchTrendingUrl,
  fetchGenreListUrl,
  fetchMoviesByLanguageUrl,
} from '../../constants/api';

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
    <SafeAreaView className="flex-1 bg-[#111318]">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header & Search Bar */}
        <View className="mt-6 mb-8">
          <Text className="text-3xl font-bold text-[#e2e2e8] mb-6">Search</Text>
          <View className="flex-row items-center bg-[#1e2024] rounded-2xl px-4 py-3 border border-[#584238]/10">
            <MagnifyingGlassIcon size={24} color="#ffb692" />
            <TextInput
              value={searchQuery}
              onChangeText={handleSearch}
              placeholder="Movies, actors, genres..."
              placeholderTextColor="#dfc0b3"
              className="flex-1 ml-3 text-[#e2e2e8] text-lg font-medium"
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity onPress={() => handleSearch('')}>
                <XMarkIcon size={24} color="#dfc0b3" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <MicrophoneIcon size={24} color="#dfc0b3" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {searchQuery.length > 2 ? (
          /* Search Results */
          <View className="mb-8">
            <Text className="text-xl font-semibold text-[#e2e2e8] mb-4">Results</Text>
            {searching ? (
              <ActivityIndicator color="#ffb692" size="large" />
            ) : (
              <View className="flex-row flex-wrap justify-between">
                {searchResults.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="mb-4"
                    style={{ width: width * 0.44 }}
                    onPress={() => router.push(`/movie/${item.id}`)}
                  >
                    <Image
                      source={{ uri: item.poster_path ? `${API_IMAGE_URL}${item.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image' }}
                      className="w-full h-64 rounded-2xl mb-2"
                      resizeMode="cover"
                    />
                    <Text className="text-[#e2e2e8] font-medium" numberOfLines={1}>{item.title}</Text>
                    <Text className="text-[#dfc0b3] text-sm">{item.release_date?.split('-')[0] || 'N/A'}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            {!searching && searchResults.length === 0 && (
              <Text className="text-[#dfc0b3] text-center mt-10">No results found for "{searchQuery}"</Text>
            )}
          </View>
        ) : (
          /* Default Content */
          <>
            {/* Recent Searches */}
            <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-semibold text-[#e2e2e8]">Recent Searches</Text>
                <TouchableOpacity>
                  <Text className="text-[#ffb692] text-sm">Clear All</Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row flex-wrap gap-2">
                {recentSearches.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => handleSearch(item)}>
                    <View className="flex-row items-center bg-[#1e2024] px-4 py-2 rounded-full border border-[#584238]/20">
                      <Text className="text-[#dfc0b3] mr-2">{item}</Text>
                      <XMarkIcon size={16} color="#dfc0b3" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Trending Now (Dynamic) */}
            <View className="mb-8">
              <Text className="text-xl font-semibold text-[#e2e2e8] mb-4">Trending Now</Text>
              {loading ? (
                <ActivityIndicator color="#ffb692" />
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                  {trendingMovies.map((item,index) => {
                    if(index>5 || !item.poster_path) return null;
                    return(
                    <TouchableOpacity
                      key={item.id}
                      className="mr-4 w-40"
                      onPress={() => router.push(`/movie/${item.id}`)}
                    >
                      <Image
                        source={{ uri: `${API_IMAGE_URL}${item.poster_path}` }}
                        className="w-full h-56 rounded-2xl mb-2"
                        resizeMode="cover"
                      />
                      <Text className="text-[#e2e2e8] font-medium" numberOfLines={1}>{item.title}</Text>
                    </TouchableOpacity>
                  )
                })}
                </ScrollView>
              )}
            </View>

            {/* Explore by Genre */}
            <View className="mb-8">
              <Text className="text-xl font-semibold text-[#e2e2e8] mb-4">Explore by Genre</Text>
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
              <Text className="text-xl font-semibold text-[#e2e2e8] mb-4">Explore by Language</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                {languages.map((lang, index) => (
                  <TouchableOpacity
                    key={index}
                    className="bg-[#1e2024] px-8 py-4 rounded-2xl mr-3 border border-[#584238]/10"
                    onPress={() => router.push(`/explore/language/${lang.code}?title=${lang.name}`)}
                  >
                    <Text className="text-[#e2e2e8] font-medium">{lang.name}</Text>
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
