import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions,
  StatusBar,
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
    <View className="flex-1 w-full h-full bg-black">
      <StatusBar hidden={true} />
      <VideoView
        player={player}
        nativeControls={true}
        contentFit="cover"
        posterSource={poster}
        style={StyleSheet.absoluteFill}
      />
    </View>
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
