import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getRequest } from "@/hooks/reqBuilder";
import { API_IMAGE_URL, API_KEY, movieCreditsUrl } from "@/constants/api";

type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

export default function CastScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMovieCredits = async () => {
    if (!id) return;
    try {
      const res = await getRequest(movieCreditsUrl(id), {}, API_KEY);
      if (res && res.cast) {
        const filteredCast = res.cast.filter((person: any) => person.known_for_department === "Acting");
        setCast(filteredCast);
      }
    } catch (error) {
      console.error("Error fetching cast:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieCredits();
  }, [id]);

  const renderCastMember = ({ item }: { item: CastMember }) => (
    <TouchableOpacity
      onPress={() => router.push(`/person/${item.id}`)}
      className="flex-1 m-2 items-center"
    >
      <Image
        source={{
          uri: item.profile_path
            ? `${API_IMAGE_URL}${item.profile_path}`
            : "https://via.placeholder.com/150",
        }}
        className="w-24 h-24 rounded-full"
        resizeMode="cover"
      />
      <Text className="text-white text-sm font-bold mt-2 text-center" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="text-gray-500 text-[10px] text-center" numberOfLines={1}>
        {item.character}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#1a1a1a]">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeftIcon size={30} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Cast Members</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={cast}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCastMember}
          numColumns={3}
          contentContainerStyle={{ padding: 8 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
