import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Dimensions
} from "react-native";
import {
  ChevronLeftIcon,
} from "react-native-heroicons/solid";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import MovieCard from "@/components/MovieCard";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function WatchListScreen() {
  const router = useRouter();
  const watchlist = useSelector((state) => state.watchlist.watchlist);

  const renderItem = ({ item }) => (
    <MovieCard
      item={item}
      width={(SCREEN_WIDTH - 48) / 2}
      height={240}
      containerClass="mb-4 mx-2"
    />
  );

  return (
    <SafeAreaView className="bg-surface-bright flex-1">
      <View className="flex-row items-center px-4 py-3 mt-10">
        <TouchableOpacity className="mr-4" onPress={() => router.back()}>
          <ChevronLeftIcon size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-2xl font-bold">Watch list</Text>
      </View>

      <FlatList
        data={watchlist}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-20">
            <Text className="text-gray-500 text-lg">Your watchlist is empty</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
