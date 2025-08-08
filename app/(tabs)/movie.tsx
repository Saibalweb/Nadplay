// App.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ListRenderItem,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getRequest } from "@/hooks/reqBuilder";

// Constants
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface Genre {
  id: number;
  name: string;
}

const GENRES: Genre[] = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 10749, name: "Romance" },
  { id: 53, name: "Thriller" },
  { id: 14, name: "Fantasy" },
];


export default function App() {
  const [moviesByGenre, setMoviesByGenre] = useState<Record<number, Movie[]>>({});
  const [pageNumbers, setPageNumbers] = useState<Record<number, number>>({});
  const [hasMoreByGenre, setHasMoreByGenre] = useState<Record<number, boolean>>({});
  const [loadingByGenre, setLoadingByGenre] = useState<Record<number, boolean>>({});

  const fetchMovies = async (genreId: number, pageNumber: number = 1): Promise<void> => {
    if (loadingByGenre[genreId] || hasMoreByGenre[genreId] === false) return;

    try {
      setLoadingByGenre((prev) => ({ ...prev, [genreId]: true }));

      const fetchMovieUrl = `${process.env.EXPO_PUBLIC_API_URL}/discover/movie?with_genres=${genreId}&include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;
      const token = process.env.EXPO_PUBLIC_API_KEY || "";

      const data = await getRequest(fetchMovieUrl, {}, token);

      if (data.results?.length > 0) {
        const limitedResults: Movie[] = data.results.slice(0, 10); // limit to 10 per fetch
        setMoviesByGenre((prev) => ({
          ...prev,
          [genreId]:
            pageNumber === 1
              ? limitedResults
              : [...(prev[genreId] || []), ...limitedResults],
        }));

        setPageNumbers((prev) => ({ ...prev, [genreId]: pageNumber }));
        setHasMoreByGenre((prev) => ({ ...prev, [genreId]: pageNumber < data.total_pages }));
      } else {
        setHasMoreByGenre((prev) => ({ ...prev, [genreId]: false }));
      }
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
    } finally {
      setLoadingByGenre((prev) => ({ ...prev, [genreId]: false }));
    }
  };

  useEffect(() => {
    GENRES.forEach((genre) => {
      fetchMovies(genre.id, 1);
    });
  }, []);

  const renderMovieCard: ListRenderItem<Movie> = ({ item }) => (
    <TouchableOpacity
      onPress={() => console.log("Clicked:", item.title)}
      className="mr-4 w-36"
    >
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
        className="w-36 h-52 rounded-lg"
      />
      <Text className="text-white mt-1" numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderSection = (title: string, genreId: number) => {
    const movies = moviesByGenre[genreId] || [];
    const isLoading = loadingByGenre[genreId];

    return (
      <View className="mt-6">
        <Text className="text-white text-lg font-semibold mb-3">{title}</Text>
        {movies.length === 0 && isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <FlatList
            horizontal
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderMovieCard}
            showsHorizontalScrollIndicator={false}
            onEndReached={() => fetchMovies(genreId, (pageNumbers[genreId] || 1) + 1)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoading ? (
                <View className="justify-center items-center px-2">
                  <ActivityIndicator size="small" color="#fff" />
                </View>
              ) : null
            }
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-900 px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Coming Soon */}
        <Text className="text-white text-xl font-bold mb-3 mt-2">Coming Soon</Text>
        <View className="relative">
          <Image
            source={{ uri: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1024_.jpg" }}
            className="w-full h-48 rounded-lg"
          />
          <TouchableOpacity
            onPress={() => console.log("Play trailer")}
            className="absolute top-1/2 left-1/2 -ml-5 -mt-5 bg-orange-500 w-10 h-10 rounded-full items-center justify-center"
          >
            <Ionicons name="play" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Genres */}
        <View className="flex-row flex-wrap mt-3">
          {GENRES.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              onPress={() => console.log("Clicked genre:", genre.name)}
              className="bg-gray-700 px-3 py-1 rounded-full mr-2 mt-2"
            >
              <Text className="text-white text-sm">{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dynamic Sections */}
        {renderSection("Now Showing (Action)", 28)}
        {renderSection("Comedy Movies", 35)}
        {renderSection("Romance Movies", 10749)}
        {renderSection("Thriller Movies", 53)}
        {renderSection("Fantasy Movies", 14)}
      </ScrollView>
    </SafeAreaView>
  );
}
