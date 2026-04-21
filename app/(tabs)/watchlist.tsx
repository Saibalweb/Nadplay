import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  ChevronLeftIcon,
  StarIcon,
  ClockIcon,
} from "react-native-heroicons/solid";
import { TagIcon, CalendarIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { API_IMAGE_URL } from "@/constants/api";
export default function WatchListScreen({ navigation }) {
  const router = useRouter();
  const imgUrl = API_IMAGE_URL;
  const watchlist = useSelector((state) => state.watchlist.watchlist);
  return (
    <SafeAreaView className="bg-[#1a1a1a]" style={{ flex: 1 }}>
      <View className="flex-row items-center px-4 py-3 mt-10">
        <TouchableOpacity className="mr-4">
          <ChevronLeftIcon size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Watch list</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/watch/123`,
          })
        }
        className="bg-red-500 p-10 m-4"
      >
        <Text>Watch</Text>
      </TouchableOpacity>
      {/* Movie List */}
      <ScrollView className="flex-1">
        {watchlist.map((movie) => (
          <TouchableOpacity
            key={movie.id}
            className="flex-row p-4 border-b border-gray-800"
            onPress={() =>
              router.push({
                pathname: "/movie/[id]",
                params: { id: movie.id },
              })
            }
          >
            {/* Movie Poster */}
            <Image
              source={{ uri: `${imgUrl}${movie.poster_path}` }}
              className="w-32 h-40 rounded-lg"
              resizeMode="cover"
            />

            {/* Movie Details */}
            <View className="flex-1 ml-4 justify-center">
              <Text className="text-white text-lg font-semibold mb-1">
                {movie.title}
              </Text>

              {/* Rating */}
              <View className="flex-row items-center mb-2">
                <StarIcon size={16} color="#FFD700" />
                <Text className="text-white ml-1">{movie.vote_average}</Text>
              </View>

              {/* Genre */}
              <View className="flex-row items-center mb-2">
                <TagIcon size={16} color="#666" />
                <Text className="text-gray-400 ml-1">
                  {movie.genres[0].name}
                </Text>
              </View>

              {/* Year */}
              <View className="flex-row items-center mb-2">
                <CalendarIcon size={16} color="#666" />
                <Text className="text-gray-400 ml-1">{movie.release_date}</Text>
              </View>

              {/* Duration */}
              <View className="flex-row items-center">
                <ClockIcon size={16} color="#666" />
                <Text className="text-gray-400 ml-1">
                  {movie.runtime} minutes
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
