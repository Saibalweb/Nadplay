import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
  XMarkIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import { useRouter } from 'expo-router';

const SearchScreen = () => {
  const router = useRouter();

  const recentSearches = ['Inception', 'The Dark Knight', 'Interstellar'];
  
  const recommended = [
    {
      id: 1,
      title: 'Neon Horizon',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxZDuJz_VdigNvN4SeQWH5shTY0SwSxawKY7YXWwnXHb554UyN1GX1I0Efmi-5ApN_wFPbubhPuxAHcaWWPI3K-69B7BCkoDmJAbwYRTiEYToLju-oZxbeIm0fT99eUysPtvHUh9mu6H0aWW7bEld6Pbim0eWW2VZYMiO1OVLNhSaKym0xNVe32-GV8IQQ8klgZrqwT8himS3YPgrwDXvh3O59VqqU_lkJK0dICPGkL-ndTLbHMjJWJWDEpXRc7rRzXsMWwJIVOjKf',
    },
    {
      id: 2,
      title: 'The Last Dialogue',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDupMrxXdnxnppswcu9AkRnSW0xAZ5xXrvlnW7ASi8LgDH9m3W-0_0QgYWOf_shBhbKGNKVXqFcAXtofFLBcW5Rw1vtEAbvXnKuYz1flMyKDKf8kb5bKwZwgvY1OslHYWcZgmo3jlSRwzNLHrShqkKWVocUlP_C_5_c60n7HitBZiWf5EKL_NgGZQ9X1mdL1ksE1Tr9yVm043OsHW-k-2a70VNKo1tROD1vRbMbn2AyuKJgVgG66anS-POmfWuIBVIDFw7T1z0oHI_c',
    },
    {
      id: 3,
      title: 'Silent Echoes',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjZ8jnXlFC-M7FtcFG4RCAsdRPkq6cTJpeYatX7HFuGwrozFHMd9dR2lCeUpZ5WSP93VPKlBHyDP5ecae18WxLgx29yy6gmEglhdi-gIX5YlTw9DW24MteF8aBwl6KPYBz3wtHf7UzhCivvhK8mJaLNpxrIzWmqNmbRlcLMqUq8G8XOfH4Wy35SWlOi356XuqIThm8kAGBaxeHijaXubseyT8gA7kdVtI7pJp537ap_MA-SruJfKqAw9e9vNfps9r_A3MRvEgLkZxu',
    },
  ];

  const trending = [
    { title: 'The Dune Legacy', sub: 'Trending in Action' },
    { title: 'Cillian Murphy', sub: 'Top Actor' },
    { title: 'Midnight in Tokyo', sub: 'New Release' },
    { title: 'Academy Awards 2024', sub: 'Search Trend' },
  ];

  const genres = [
    { title: 'Action', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8sHMYSTZ7MlYJuCCa0LGhtkkOpc46SqgdR5hPMZiJ0t0INEnspeiw2ssHoPTAe37wQn41qYeYoC4pjlKUsSRjggzFKNzmucioMu3oiFwQdAZLFh6JSx_uQGvZBDKwsNY6uXSWJpbWsGi9FyRlYISkZ4vFR7itx40omG_PoIKi2YBomQKReMx55_49M-5ispH2ZD2RVa38e5pgaIvoU7QcajtiCtRUDB2nd8Sf9uv_Kkx-At84-bAPED4iZXGn_LvNhcz1UtzfeZdX', color: 'bg-orange-500/60' },
    { title: 'Comedy', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDupMrxXdnxnppswcu9AkRnSW0xAZ5xXrvlnW7ASi8LgDH9m3W-0_0QgYWOf_shBhbKGNKVXqFcAXtofFLBcW5Rw1vtEAbvXnKuYz1flMyKDKf8kb5bKwZwgvY1OslHYWcZgmo3jlSRwzNLHrShqkKWVocUlP_C_5_c60n7HitBZiWf5EKL_NgGZQ9X1mdL1ksE1Tr9yVm043OsHW-k-2a70VNKo1tROD1vRbMbn2AyuKJgVgG66anS-POmfWuIBVIDFw7T1z0oHI_c', color: 'bg-blue-500/60' },
    { title: 'Drama', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxZDuJz_VdigNvN4SeQWH5shTY0SwSxawKY7YXWwnXHb554UyN1GX1I0Efmi-5ApN_wFPbubhPuxAHcaWWPI3K-69B7BCkoDmJAbwYRTiEYToLju-oZxbeIm0fT99eUysPtvHUh9mu6H0aWW7bEld6Pbim0eWW2VZYMiO1OVLNhSaKym0xNVe32-GV8IQQ8klgZrqwT8himS3YPgrwDXvh3O59VqqU_lkJK0dICPGkL-ndTLbHMjJWJWDEpXRc7rRzXsMWwJIVOjKf', color: 'bg-purple-500/60' },
    { title: 'Horror', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjZ8jnXlFC-M7FtcFG4RCAsdRPkq6cTJpeYatX7HFuGwrozFHMd9dR2lCeUpZ5WSP93VPKlBHyDP5ecae18WxLgx29yy6gmEglhdi-gIX5YlTw9DW24MteF8aBwl6KPYBz3wtHf7UzhCivvhK8mJaLNpxrIzWmqNmbRlcLMqUq8G8XOfH4Wy35SWlOi356XuqIThm8kAGBaxeHijaXubseyT8gA7kdVtI7pJp537ap_MA-SruJfKqAw9e9vNfps9r_A3MRvEgLkZxu', color: 'bg-red-500/60' },
    { title: 'Sci-Fi', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBh5HB7Vt1RkSg0kQ3GNh3CiJeWnAdPYoOd47uE1NkyprJV5h175dOiGPGLmwneDXU8oPAyIsAkoYOz84lPa9_s8-pUvDr3x2TS1atQnsC0F_qh16kEFTumW-0HyMnUhqC7KdJGM5MgEWL9vExxbW30kephVU87WC_lSgrGDNox2FI2P1lXK3T_R6pYyLDJ7cplxyS0ENHAB6YWJUIphIMeYvTz9ZBayYI35xu0DtejpXUGf9dBFLciCo1l-FlsTgRA6KCiyztzPjCr', color: 'bg-teal-500/60' },
    { title: 'Thriller', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRdAAAMhRRGk0umzAFfozjdJRDXX-74lOQLJrdxdIMLCD45o_fn8gcOq8cEEeJPs-g9yo1zqNjCSn_38AMRetwL_KPhq28UUibStrQfhDEKWqqahQpE3i_Je1NmNcvFyQwCdyWN-Rgp-eHxjSo0yVNZfwQXybzVCRPpT9ukSk7eJng4TftBQ29T6lLqF51Qx-PzvV2d_XXMU0u5CU3gRmwG-pw5rFRyFPyqUCMhkCFcs0iD5fNCU3vHXsljy6FlG6_DEVeptlYbDbW', color: 'bg-gray-800/60' },
  ];

  const languages = ['English', 'Spanish', 'French', 'Japanese', 'Korean', 'German', 'Hindi'];

  return (
    <SafeAreaView className="flex-1 bg-[#111318]">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Header & Search Bar */}
        <View className="mt-6 mb-8">
          <Text className="text-3xl font-bold text-[#e2e2e8] mb-6">Search</Text>
          <View className="flex-row items-center bg-[#1e2024] rounded-2xl px-4 py-3 border border-[#584238]/10">
            <MagnifyingGlassIcon size={24} color="#ffb692" />
            <TextInput
              placeholder="Movies, actors, genres..."
              placeholderTextColor="#dfc0b3"
              className="flex-1 ml-3 text-[#e2e2e8] text-lg font-medium"
            />
            <TouchableOpacity>
              <MicrophoneIcon size={24} color="#dfc0b3" />
            </TouchableOpacity>
          </View>
        </View>

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
              <View key={index} className="flex-row items-center bg-[#1e2024] px-4 py-2 rounded-full border border-[#584238]/20">
                <Text className="text-[#dfc0b3] mr-2">{item}</Text>
                <TouchableOpacity>
                  <XMarkIcon size={16} color="#dfc0b3" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended for You */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-[#e2e2e8] mb-4">Recommended for You</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {recommended.map((item) => (
              <TouchableOpacity key={item.id} className="mr-4 w-40">
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-56 rounded-2xl mb-2"
                  resizeMode="cover"
                />
                <Text className="text-[#e2e2e8] font-medium" numberOfLines={1}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Trending */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-[#e2e2e8] mb-4">Trending</Text>
          <View className="bg-[#1e2024] rounded-2xl overflow-hidden border border-[#584238]/10">
            {trending.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center justify-between p-4 ${index !== trending.length - 1 ? 'border-b border-[#584238]/10' : ''}`}
              >
                <View>
                  <Text className="text-[#e2e2e8] font-semibold text-lg">{item.title}</Text>
                  <Text className="text-[#dfc0b3] text-sm">{item.sub}</Text>
                </View>
                <ChevronRightIcon size={20} color="#ffb692" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Explore by Genre */}
        <View className="mb-8">
          <Text className="text-xl font-semibold text-[#e2e2e8] mb-4">Explore by Genre</Text>
          <View className="flex-row flex-wrap gap-3">
            {genres.map((genre, index) => (
              <TouchableOpacity key={index} className="w-[47%] h-32 rounded-2xl overflow-hidden mb-1">
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
              >
                <Text className="text-[#e2e2e8] font-medium">{lang}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
