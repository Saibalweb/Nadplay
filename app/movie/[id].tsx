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
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { getRequest } from "@/hooks/reqBuilder";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToWatchlist, removeMovieFromWatchlist, RootState } from "@/store";
import { API_IMAGE_URL, API_KEY, movieCreditsUrl, movieDetailsUrl } from "@/constants/api";

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
};

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};
type Director = {
  id: number;
  name: string;
  profile_path: string;
} 
export default function MovieDetailScreen({ navigation }) {
      const router = useRouter();
  const imgUrl = API_IMAGE_URL;
  const { id } = useLocalSearchParams<{ id: string }>();
  const watchlist = useSelector((state: RootState) => state.watchlist.watchlist);
  const [bookmark, setBookmark] = React.useState(false);
  const [cast, setCast] = React.useState<Cast[]>([]);
  const [director, setDirector] = React.useState<Director[]>([]);
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
    if (!id) return;
    const res = await getRequest(movieDetailsUrl(id), {}, API_KEY);
    if(res?.id == id){
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
  };

  const fetchMovieCredits = async () => {
    if (!id) return;
    const res = await getRequest(movieCreditsUrl(id), {}, API_KEY);
    if (res) {
      // Filter for cast (actors)
      const filtered_cast = res?.cast?.filter((person: any) => person?.known_for_department === "Acting") || [];
      setCast(filtered_cast.slice(0, 10));

      // Filter for actual directors of this movie using the 'job' field
      const directors = res?.crew?.filter((person: any) => person?.job === "Director") || [];
      setDirector(directors);
    }
  };
  const dispatch = useDispatch();
  const bookMarkHandler = () => {
    if(bookmark){
      dispatch(removeMovieFromWatchlist(id));
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
  useEffect(() => {
    fetchMovieDetails();
    fetchMovieCredits();
  }, []);
  useEffect(() => {
    // Check if the movie is already in the watchlist
    const isBookmarked = watchlist.some((movie) => movie.id == Number(id));
    setBookmark(isBookmarked);
  }, [watchlist, id]);
  return (
    <SafeAreaView className="flex-1 bg-[#1a1a1a] p-2">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 absolute top-10 w-full z-10">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={bookMarkHandler}>
        <Ionicons name={bookmark?"bookmark":"bookmark-outline"} size={40} color={'white'}/>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="h-80 relative">
          <Image
            source={{ uri: `${imgUrl}${movieDetails.backdrop_path}`}}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#1a1a1a] to-transparent" />

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

          {/* About Movie Section */}
          <View className="mt-8">
            <Text className="text-white text-lg font-bold mb-2">About Movie</Text>
            <Text className="text-gray-400 leading-6">
              {movieDetails.overview}
            </Text>
          </View>

          {/* Director Section */}
          <View className="mt-8">
            <Text className="text-white text-lg font-bold mb-4">Director</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {director.map((person) => (
                  <View key={person.id} className="mr-4 items-center w-20">
                    <Image
                      source={{
                        uri: person.profile_path
                          ? `${imgUrl}${person.profile_path}`
                          : "https://via.placeholder.com/150",
                      }}
                      className="w-20 h-20 rounded-full"
                    />
                    <Text
                      className="text-white text-xs mt-2 text-center"
                      numberOfLines={2}
                    >
                      {person.name}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Cast Section */}
          <View className="mt-8 mb-8">
            <Text className="text-white text-lg font-bold mb-4">Cast</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {cast.map((person) => (
                  <View key={person.id} className="mr-4 items-center w-20">
                    <Image
                      source={{
                        uri: person.profile_path
                          ? `${imgUrl}${person.profile_path}`
                          : "https://via.placeholder.com/150",
                      }}
                      className="w-20 h-20 rounded-full"
                    />
                    <Text
                      className="text-white text-xs mt-2 text-center"
                      numberOfLines={2}
                    >
                      {person.name}
                    </Text>
                    <Text
                      className="text-gray-500 text-[10px] text-center"
                      numberOfLines={1}
                    >
                      {person.character}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
