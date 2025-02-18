import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import {
  ChevronLeftIcon,
  StarIcon,
  ClockIcon,
} from "react-native-heroicons/solid";
import { Ionicons } from "@expo/vector-icons";
import { TagIcon, CalendarIcon } from "react-native-heroicons/outline";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { getRequest } from "@/hooks/reqBuilder";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToWatchlist, removeMovieFromWatchlist } from "@/store";

const tabs = ["About Movie", "Reviews", "Cast"];
type movieDetails = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  genres: Array<object>;
  overview: string;
  release_date: string;
  runtime: number;
  spoken_languages: object;
  title: string;
  vote_average: number;
}
export default function MovieDetailScreen({ navigation }) {
  const imgUrl = process.env.EXPO_PUBLIC_Image_URL;
  const item = useLocalSearchParams();
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  const [activeTab, setActiveTab] = React.useState("About Movie");
  const [bookmark, setBookmark] = React.useState(false);
  const [movieDetails, setMovieDetails] = React.useState<movieDetails>({
    id: 0,
    adult: false,
    backdrop_path: "",
    poster_path: "",
    genres: [],
    overview: "",
    release_date: "",
    runtime: 0,
    spoken_languages: {},
    title: "",
    vote_average: 0,
  });

  const fetchMovieDetails = async () => {
    const movieId = item.id;
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    const token = process.env.EXPO_PUBLIC_API_KEY;
    const res = await getRequest(movieDetailsUrl, {}, token);
    if(res?.id == movieId){
      setMovieDetails({
        id: res?.id,
        adult: res?.adult,
        backdrop_path: res?.backdrop_path,
        poster_path: res?.poster_path,
        genres: res?.genres,
        overview: res?.overview,
        release_date: res?.release_date,
        runtime: res?.runtime,
        spoken_languages: res?.spoken_languages,
        title: res?.title,
        vote_average: res?.vote_average
      });
    }
  }
  const dispatch = useDispatch();
  const bookMarkHandler = () => {
    if(bookmark){
      dispatch(removeMovieFromWatchlist(item.id));
    }else{
      dispatch(addMovieToWatchlist({
        id: movieDetails.id,
        adult: movieDetails.adult,
        poster_path: movieDetails.poster_path,
        genres: movieDetails.genres,
        release_date: movieDetails.release_date,
        runtime: movieDetails.runtime,
        title: movieDetails.title,
        vote_average: movieDetails.vote_average
      }))
    }
    }
  useEffect(()=>{
    fetchMovieDetails();
  },[]);
  useEffect(() => {
    // Check if the movie is already in the watchlist
    const isBookmarked = watchlist.some((movie) => movie.id == item.id);
    setBookmark(isBookmarked);
  }, [watchlist, item.id]);

  return (
    <SafeAreaView className="flex-1 bg-[#1a1a1a] p-2">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 absolute top-10 w-full z-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={bookMarkHandler}>
        <Ionicons name={bookmark?"bookmark":"bookmark-outline"} size={40} color={'white'}/>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Movie Banner */}
        <View className="h-80 relative">
          <Image
            source={{ uri: `${imgUrl}${movieDetails.backdrop_path}`}}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Gradient Overlay */}
          <View className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#1a1a1a] to-transparent" />

          {/* Movie Thumbnail */}
          <View className="absolute top-60 left-4 flex-row items-end">
            <Image
              source={{ uri: `${imgUrl}${movieDetails.poster_path}`}}
              className="w-28 h-40 rounded-lg"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="text-white text-2xl font-bold mb-1">
                {movieDetails.title}
              </Text>
              <View className="flex-row items-center">
                <StarIcon size={16} color="#FFD700" />
                <Text className="text-white ml-1">{+movieDetails.vote_average.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Movie Info */}
        <View className="px-4 mt-32">
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center mx-1">
              <CalendarIcon size={16} color="#666" />
              <Text className="text-gray-400 ml-1">{movieDetails?.release_date}</Text>
            </View>
            <View className="flex-row items-center mx-1">
              <ClockIcon size={16} color="#666" />
              <Text className="text-gray-400 ml-1"> {`${movieDetails.runtime} Minutes`}</Text>
            </View>
            <View className="flex-row items-center mx-1">
              <TagIcon size={16} color="#666" />
              <Text className="text-gray-400 ml-1">{movieDetails?.genres[0]?.name}</Text>
            </View>
          </View>

          {/* Tabs */}
          <View className="flex-row mt-6 border-b border-gray-800">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className="mr-6 pb-2"
              >
                <Text
                  className={`${
                    activeTab === tab ? "text-white" : "text-gray-500"
                  }`}
                >
                  {tab}
                </Text>
                {activeTab === tab && (
                  <View className="h-0.5 bg-red-500 absolute bottom-0 w-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* About Content */}
          {activeTab === "About Movie" && (
            <Text className="text-gray-400 mt-4 leading-6">
              {movieDetails.overview}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
