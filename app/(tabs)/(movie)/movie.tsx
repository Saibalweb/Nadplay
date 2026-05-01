import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { getRequest } from "@/hooks/reqBuilder";
import { API_IMAGE_URL, fetchMovieUrl, fetchTvUrl, API_KEY } from "@/constants/api";

const categories = ["Movies", "Tv Series"];


export default function Movie() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = React.useState("Movies");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchContent = async (pageNumber: number, category: string) => {
    if (loading) return;

    try {
      setLoading(true);
      const url = category === "Movies" ? fetchMovieUrl(pageNumber) : fetchTvUrl(pageNumber);
      const data = await getRequest(url, {}, API_KEY);

      if (data.results.length > 0) {
        setMovies((prevItems) =>
          pageNumber === 1 ? data.results : [...prevItems, ...data.results]
        );
        setHasMore(pageNumber < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchContent(1, activeCategory);
  }, [activeCategory]);
  const renderItem = ({ item }: { item: any }) => {
    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date;
    const route = activeCategory === "Movies" ? `/movie/${item.id}` : `/tv/${item.id}`;

    return (
      <TouchableOpacity
        key={item.id}
        className="w-[46%] mb-4 mx-2"
        onPress={() => router.push(route)}
      >
        <Image
          source={{
            uri: `${API_IMAGE_URL}${item.poster_path}`,
          }}
          className="w-full h-56 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white mt-2" numberOfLines={1}>{title}</Text>
        <Text className="text-gray-500">{date}</Text>
      </TouchableOpacity>
    );
  };
  const renderLoader = () => {
    if (!loading) return null;
    return (
      <View className="items-center justify-center my-4">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const loadMoreContent = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchContent(nextPage, activeCategory);
    }
  };
  return (
    <View className="flex-1 bg-[#121212] px-4 py-4 pt-12">
      {/* Header */}
      <Text className="text-white text-3xl font-semibold my-4 mx-2">
        Find Movies, Tv series,{"\n"}and more..
      </Text>

      {/* Search Bar */}
      {/* <View className="flex-row items-center  bg-[#1f1f1f] rounded-lg px-4 py-2 my-3 mx-2">
        <MaterialCommunityIcons size={20} color="#666" name='magnify' />
        <TextInput
          placeholder="Sherlock Holmes"
          placeholderTextColor="#666"
          className="flex-1  text-white text-xl items-center"
        />
      </View> */}

      {/* Categories */}
      <View className="mb-6 mx-4 flex-row">
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setActiveCategory(category)}
            className="mr-8"
          >
            <Text className="text-white text-xl">{category}</Text>
            {activeCategory === category && (
              <View className="h-0.5 bg-red-500 mt-1" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Movie Grid */}
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreContent}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoader}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
