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
import img from "../../../assets/images/movie_demo.jpeg";
import { router } from "expo-router";
import { getRequest } from "@/hooks/reqBuilder";

const categories = ["Movies", "Tv Series"];

const API_KEY = "YOUR_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// const movies = [
//   {
//     id: 1,
//     title: "Soul",
//     year: "2020",
//     image: img,
//   },
//   {
//     id: 2,
//     title: "Knives Out",
//     year: "2019",
//     image: img,
//   },
//   {
//     id: 3,
//     title: "Onward",
//     year: "2020",
//     image: img,
//   },
//   {
//     id: 4,
//     title: "Mulan",
//     year: "2020",
//     image: img,
//   },
//   {
//     id: 5,
//     title: "The Invisible",
//     year: "2020",
//     image: img,
//   },
// ];

export default function Home() {
  const [activeCategory, setActiveCategory] = React.useState("Movies");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNumber: number) => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const fetchMovieUrl = `${process.env.EXPO_PUBLIC_API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc`;
      const token = process.env.EXPO_PUBLIC_API_KEY;
      const data = await getRequest(fetchMovieUrl, {}, token);
      console.log(data);

      if (data.results.length > 0) {
        setMovies((prevMovies) =>
          pageNumber === 1 ? data.results : [...prevMovies, ...data.results]
        );
        setHasMore(pageNumber < data.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(1);
  }, []);
  const rennderMovies = ({ item }) => {
    console.log('item', item);
    const imgUrl = `${IMAGE_BASE_URL}${item.poster_path}`;
    console.log('imgUrl', imgUrl);
    return(
    <TouchableOpacity
      key={item.id}
      className="w-[46%] mb-4 mx-2"
      onPress={() => router.push("moviedetails")}
    >
      <Image
        source={{
          uri: `${IMAGE_BASE_URL}${item.poster_path}`,
        }}
        className="w-full h-56 rounded-lg"
        resizeMode="cover"
      />
      <Text className="text-white mt-2">{item.title}</Text>
      <Text className="text-gray-500">{item.release_date}</Text>
    </TouchableOpacity>
    )
  };
  const renderLoader = () => {
    if (!loading) return null;
    return (
      <View className="items-center justify-center my-4">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage);
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
        renderItem={rennderMovies}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderLoader}
        numColumns={2}
      />
    </View>
  );
}
