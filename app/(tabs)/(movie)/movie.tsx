import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import { getRequest } from "@/hooks/reqBuilder";
import { API_IMAGE_URL, fetchMovieUrl, fetchTvUrl, API_KEY } from "@/constants/api";
import MovieCard from "@/components/MovieCard";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
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
    return (
      <MovieCard
        item={item}
        width={(SCREEN_WIDTH - 48) / 2} // Account for padding and gap
        height={240}
        containerClass="mb-4 mx-2"
        type={activeCategory === "Movies" ? "movie" : "tv"}
      />
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
