import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ChevronLeftIcon, StarIcon, ClockIcon, BookmarkIcon } from "react-native-heroicons/solid";
import { TagIcon, CalendarIcon } from "react-native-heroicons/outline";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";


const tabs = ["About Movie", "Reviews", "Cast"];

export default function MovieDetailScreen({ navigation }) {
  const [activeTab, setActiveTab] = React.useState("About Movie");

  return (
    <SafeAreaView className="flex-1 bg-[#1a1a1a]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 absolute top-0 w-full z-10">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Detail</Text>
        <TouchableOpacity>
          <BookmarkIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Movie Banner */}
        <View className="h-72 relative">
          <Image
            source={{ uri: "/placeholder.svg?height=300&width=400" }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Gradient Overlay */}
          <View className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
          
          {/* Movie Thumbnail */}
          <View className="absolute bottom-4 left-4 flex-row items-end">
            <Image
              source={{ uri: "/placeholder.svg?height=100&width=70" }}
              className="w-20 h-28 rounded-lg"
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="text-white text-2xl font-bold mb-1">
                Spiderman No Way Home
              </Text>
              <View className="flex-row items-center">
                <StarIcon size={16} color="#FFD700" />
                <Text className="text-white ml-1">9.5</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Movie Info */}
        <View className="px-4 mt-4">
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center">
              <CalendarIcon size={16} color="#666" />
              <Text className="text-gray-400 ml-1">2021</Text>
            </View>
            <View className="flex-row items-center">
              <ClockIcon size={16} color="#666" />
              <Text className="text-gray-400 ml-1">148 Minutes</Text>
            </View>
            <View className="flex-row items-center">
              <TagIcon size={16} color="#666" />
              <Text className="text-gray-400 ml-1">Action</Text>
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
                    activeTab === tab ? 'text-white' : 'text-gray-500'
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
              From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}