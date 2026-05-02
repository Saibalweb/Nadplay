import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import {
  ChevronLeftIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { TagIcon, CalendarIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getRequest } from "@/hooks/reqBuilder";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToWatchlist, removeMovieFromWatchlist, RootState } from "@/store";
import { API_IMAGE_URL, API_KEY, tvCreditsUrl, tvDetailsUrl } from "@/constants/api";

type TvDetails = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  genres: Array<{ id: number; name: string }>;
  overview: string;
  first_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  name: string;
  vote_average: number;
};

type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

export default function TvDetailScreen() {
  const router = useRouter();
  const imgUrl = API_IMAGE_URL;
  const { id } = useLocalSearchParams<{ id: string }>();
  const watchlist = useSelector((state: RootState) => state.watchlist.watchlist);
  const [bookmark, setBookmark] = React.useState(false);
  const [cast, setCast] = React.useState<Cast[]>([]);
  const [tvDetails, setTvDetails] = React.useState<TvDetails | null>(null);

  const fetchTvDetails = async () => {
    if (!id) return;
    const res = await getRequest(tvDetailsUrl(id), {}, API_KEY);
    if (res) {
      setTvDetails(res);
    }
  };

  const fetchTvCredits = async () => {
    if (!id) return;
    const res = await getRequest(tvCreditsUrl(id), {}, API_KEY);
    if (res && res.cast) {
      const filtered_cast = res.cast.filter((person: any) => person.known_for_department === "Acting") || [];
      setCast(filtered_cast.slice(0, 10));
    }
  };

  const dispatch = useDispatch();
  const bookMarkHandler = () => {
    if (!tvDetails) return;
    if (bookmark) {
      dispatch(removeMovieFromWatchlist(id));
    } else {
      dispatch(addMovieToWatchlist({
        id: tvDetails.id,
        adult: tvDetails.adult,
        poster_path: tvDetails.poster_path,
        genres: tvDetails.genres,
        release_date: tvDetails.first_air_date,
        title: tvDetails.name,
        vote_average: tvDetails.vote_average
      }))
    }
  };

  useEffect(() => {
    fetchTvDetails();
    fetchTvCredits();
  }, [id]);

  useEffect(() => {
    const isBookmarked = watchlist.some((item) => item.id == Number(id));
    setBookmark(isBookmarked);
  }, [watchlist, id]);

  if (!tvDetails) return null;

  return (
    <SafeAreaView className="flex-1 bg-[#1a1a1a]">
      <View className="flex-row items-center justify-between px-4 py-3 absolute top-10 w-full z-10">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeftIcon size={35} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={bookMarkHandler}>
          <Ionicons name={bookmark ? "bookmark" : "bookmark-outline"} size={40} color={'white'} />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        <View className="h-80 relative">
          <Image
            source={{ uri: `${imgUrl}${tvDetails.backdrop_path}` }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute bottom-0 w-full h-1/2 bg-[#1a1a1a]/50" />

          <View className="absolute top-60 left-4 flex-row items-end">
            <Image
              source={{ uri: `${imgUrl}${tvDetails.poster_path}` }}
              className="w-28 h-40 rounded-lg"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="text-white text-2xl font-bold mb-1">
                {tvDetails.name}
              </Text>
              <View className="flex-row items-center">
                <StarIcon size={16} color="#FFD700" />
                <Text className="text-white ml-1">{+tvDetails.vote_average.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* TV Info */}
        <View className="px-4 mt-32">
          <View className="flex-row items-center flex-wrap">
            <View className="flex-row items-center mr-4 mb-2">
              <CalendarIcon size={16} color="#666" />
              <Text className="text-gray-400 ml-1">{tvDetails.first_air_date}</Text>
            </View>
            <View className="flex-row items-center mr-4 mb-2">
              <Text className="text-gray-400">{`${tvDetails.number_of_seasons} Seasons`}</Text>
            </View>
            <View className="flex-row items-center mr-4 mb-2">
              <TagIcon size={16} color="#666" />
              <Text className="text-gray-400 ml-1">{tvDetails.genres[0]?.name}</Text>
            </View>
          </View>

          {/* About Section */}
          <View className="mt-8">
            <Text className="text-white text-lg font-bold mb-2">About Tv Series</Text>
            <Text className="text-gray-400 leading-6">
              {tvDetails.overview}
            </Text>
          </View>

          {/* Cast Section */}
          <View className="mt-8 mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-white text-lg font-bold">Cast</Text>
              <TouchableOpacity onPress={() => router.push(`/tv/cast/${id}`)}>
                <Text className="text-gray-400">See All {">"}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {cast.map((person) => (
                  <TouchableOpacity
                    key={person.id}
                    onPress={() => router.push(`/person/${person.id}`)}
                    className="mr-4 items-center w-20"
                  >
                    {person.profile_path ? (
                      <Image
                        source={{ uri: `${imgUrl}${person.profile_path}` }}
                        className="w-20 h-20 rounded-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <FontAwesome name="user-circle" size={80} color="gray" style={{ width: 80, height: 80 }} />
                    )}
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
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
