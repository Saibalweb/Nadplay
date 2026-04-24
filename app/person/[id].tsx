import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { getRequest } from "@/hooks/reqBuilder";
import {
  API_IMAGE_URL,
  API_KEY,
  personDetailsUrl,
  personMovieCreditsUrl,
} from "@/constants/api";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

type PersonDetails = {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  profile_path: string;
  known_for_department: string;
  popularity: number;
};

type MovieCredit = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

export default function PersonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [movies, setMovies] = useState<MovieCredit[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPersonData = async () => {
    if (!id) return;
    try {
      const [personRes, creditsRes] = await Promise.all([
        getRequest(personDetailsUrl(id), {}, API_KEY),
        getRequest(personMovieCreditsUrl(id), {}, API_KEY),
      ]);

      if (personRes && !personRes.error) {
        setPerson(personRes);
      }
      if (creditsRes && creditsRes.cast) {
        setMovies(creditsRes.cast.sort((a: any, b: any) => b.popularity - a.popularity).slice(0, 10));
      }
    } catch (error) {
      console.error("Error fetching person data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonData();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 bg-[#1a1a1a] justify-center items-center">
        <Text className="text-white text-lg">Loading...</Text>
      </View>
    );
  }

  if (!person) {
    return (
      <View className="flex-1 bg-[#1a1a1a] justify-center items-center">
        <Text className="text-white text-lg">Person not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 bg-red-600 px-6 py-2 rounded-full"
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#1a1a1a]">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-black/30 p-2 rounded-full"
        >
          <ChevronLeftIcon size={28} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Image & Name */}
        <View className="items-center mt-4">
          <View
            className="rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl"
            style={{ width: width * 0.5, height: width * 0.5 }}
          >
            <Image
              source={{
                uri: person.profile_path
                  ? `${API_IMAGE_URL}${person.profile_path}`
                  : "https://via.placeholder.com/300",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white text-3xl font-bold mt-6 text-center">
            {person.name}
          </Text>
          <Text className="text-gray-400 text-lg font-medium">
            {person.place_of_birth}
          </Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-evenly bg-gray-800/50 mx-4 mt-8 py-4 rounded-2xl border border-gray-700">
          <View className="items-center">
            <Text className="text-gray-400 text-xs">Role</Text>
            <Text className="text-white font-bold">
              {person.known_for_department}
            </Text>
          </View>
          <View className="w-[1] h-full bg-gray-700" />
          <View className="items-center">
            <Text className="text-gray-400 text-xs">Birthday</Text>
            <Text className="text-white font-bold">{person.birthday || 'N/A'}</Text>
          </View>
          <View className="w-[1] h-full bg-gray-700" />
          <View className="items-center">
            <Text className="text-gray-400 text-xs">Popularity</Text>
            <Text className="text-white font-bold">
              {person.popularity?.toFixed(1)}
            </Text>
          </View>
        </View>

        {/* Biography */}
        <View className="px-4 mt-8">
          <Text className="text-white text-xl font-bold mb-3">Biography</Text>
          <Text className="text-gray-400 leading-6 text-base">
            {person.biography || "No biography available for this person."}
          </Text>
        </View>

        {/* Known For */}
        <View className="mt-8 mb-10">
          <Text className="text-white text-xl font-bold px-4 mb-4">
            Known For
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {movies.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                onPress={() => router.push(`/movie/${movie.id}`)}
                className="mr-4 w-32"
              >
                <Image
                  source={{
                    uri: movie.poster_path
                      ? `${API_IMAGE_URL}${movie.poster_path}`
                      : "https://via.placeholder.com/200",
                  }}
                  className="w-32 h-48 rounded-2xl"
                  resizeMode="cover"
                />
                <Text
                  className="text-white text-sm mt-2 font-medium"
                  numberOfLines={2}
                >
                  {movie.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
