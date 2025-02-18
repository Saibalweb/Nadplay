import React from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { ChevronLeftIcon, StarIcon, ClockIcon } from "react-native-heroicons/solid";
import { TagIcon, CalendarIcon } from "react-native-heroicons/outline";
import img from '../../assets/images/movie_demo.jpeg'

const watchList = [
  {
    id: 1,
    title: "Spiderman",
    rating: 9.5,
    genre: "Action",
    year: 2019,
    duration: 139,
    image: img
  },
  {
    id: 2,
    title: "Spider-Man: No Way H...",
    rating: 8.5,
    genre: "Action",
    year: 2021,
    duration: 139,
    image: img
  },
  {
    id: 4,
    title: "Spider-Man: No Way H...",
    rating: 8.5,
    genre: "Action",
    year: 2021,
    duration: 139,
    image: img
  },
  {
    id: 56,
    title: "Spider-Man: No Way H...",
    rating: 8.5,
    genre: "Action",
    year: 2021,
    duration: 139,
    image: img
  }
];

export default function WatchListScreen({ navigation }) {
  return (
    <SafeAreaView className="bg-[#1a1a1a]" style={{flex:1}}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 mt-10">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="mr-4"
        >
          <ChevronLeftIcon size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Watch list</Text>
      </View>

      {/* Movie List */}
      <ScrollView className="flex-1">
        {watchList.map((movie) => (
          <TouchableOpacity 
            key={movie.id}
            className="flex-row p-4 border-b border-gray-800"
          >
            {/* Movie Poster */}
            <Image
              source={movie.image}  
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
                <Text className="text-white ml-1">{movie.rating}</Text>
              </View>

              {/* Genre */}
              <View className="flex-row items-center mb-2">
                <TagIcon size={16} color="#666" />
                <Text className="text-gray-400 ml-1">{movie.genre}</Text>
              </View>

              {/* Year */}
              <View className="flex-row items-center mb-2">
                <CalendarIcon size={16} color="#666" />
                <Text className="text-gray-400 ml-1">{movie.year}</Text>
              </View>

              {/* Duration */}
              <View className="flex-row items-center">
                <ClockIcon size={16} color="#666" />
                <Text className="text-gray-400 ml-1">{movie.duration} minutes</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}