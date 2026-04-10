import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const videoSource = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

const VideoPlayerLandscape = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange") ?? {
    isPlaying: player.playing,
  };
  const { currentTime } = useEvent(player, "timeUpdate") ?? { currentTime: 0 };
  const totalTime = player.duration ?? 0;

  const [showSubtitles, setShowSubtitles] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    let isMounted = true;

    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT,
        );
      } catch (error) {
        console.log("Orientation lock error:", error);
      }
    };

    lockOrientation();

    return () => {
      isMounted = false;
      const resetOrientation = async () => {
        try {
          await ScreenOrientation.lockAsync(
            ScreenOrientation.OrientationLock.PORTRAIT_UP,
          );
        } catch (error) {
          console.log("Orientation reset error:", error);
        }
      };
      resetOrientation();
    };
  }, []);

  // Format time helper (seconds)
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const progress = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;

  const handlePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const handleBackward = () => {
    player.seekBy(-10);
  };

  const handleForward = () => {
    player.seekBy(10);
  };

  const handleBack = () => {
    const resetOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );
      } catch (error) {
        console.log("Orientation reset error:", error);
      }
    };
    resetOrientation();
    router.back();
  };

  const poster =
    "https://images.unsplash.com/photo-1594909122845-11bced4bd467?w=1200&h=900&fit=crop";

  return (
    <SafeAreaView
      className="w-full h-full bg-red-500"
      edges={["top", "bottom", "left", "right"]}
    >
      <View className="flex-1">
        <VideoView
          player={player}
          nativeControls={false}
          contentFit="cover"
          posterSource={poster}
        />

        {/* Main Container - Landscape */}
        <View className="flex-1 flex-row px-6 py-4 justify-between items-center">
          {/* Top Header - Left */}
          <View className="absolute top-4 left-6 flex-row items-center space-x-3">
            <TouchableOpacity
              onPress={handleBack}
              className="p-2 rounded-full bg-black/40 active:bg-black/60"
            >
              <Ionicons name="chevron-back" size={28} color="white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handlePlayPause}
            className="mx-auto inset-0 items-center justify-center  w-1/2 h-2/3 rounded-full bg-opacity-50"
            activeOpacity={0.8}
          >
            <View className="h-28 w-28 rounded-full bg-orange-400/85 items-center justify-center shadow-lg">
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={48}
                color="white"
              />
            </View>
          </TouchableOpacity>

          {/* Bottom Left - Skip Controls */}
          <View className="absolute bottom-6 left-6 flex-row items-center space-x-4">
            <TouchableOpacity
              onPress={handleBackward}
              className="p-3 rounded-full bg-black/40 active:bg-black/60"
            >
              <Ionicons name="play-back" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleForward}
              className="p-3 rounded-full bg-black/40 active:bg-black/60"
            >
              <Ionicons name="play-forward" size={22} color="white" />
            </TouchableOpacity>
          </View>

          {/* Center Bottom - Progress Bar */}
          <View className="absolute bottom-16 left-6 right-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-white text-xs font-medium">
                {formatTime(currentTime)}
              </Text>
              <Text className="text-white text-xs font-medium">
                {formatTime(totalTime)}
              </Text>
            </View>
            <View className="h-1 bg-white/30 rounded-full overflow-hidden">
              <View
                className="h-full bg-orange-400 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </View>
          </View>

          {/* Bottom Right - Controls */}
          <View className="absolute bottom-6 right-6 flex-row items-center space-x-3">
            <TouchableOpacity
              onPress={() => setShowSubtitles(!showSubtitles)}
              className={`p-3 rounded-full ${
                showSubtitles ? "bg-orange-400/70" : "bg-black/40"
              } active:bg-black/60`}
            >
              <Text className="text-white text-xs font-bold">CC</Text>
            </TouchableOpacity>

            <TouchableOpacity className="p-3 rounded-full bg-black/40 active:bg-black/60">
              <Ionicons name="volume-high" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className="p-3 rounded-full bg-black/40 active:bg-black/60">
              <Ionicons name="settings" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className="p-3 rounded-full bg-black/40 active:bg-black/60">
              <Ionicons name="expand" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity className="p-3 rounded-full bg-black/40 active:bg-black/60">
              <Ionicons name="ellipsis-horizontal" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VideoPlayerLandscape;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
});
