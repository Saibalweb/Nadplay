import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Onboarding = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/home');
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="light" />
      <ImageBackground
        source={require('../assets/images/onboarding.png')}
        className="w-full h-full justify-end"
      >
        <LinearGradient
          colors={['transparent', 'rgba(17, 19, 24, 0.8)', 'var(--background)']}
          className="h-[60%] justify-end px-[30px] pb-[60px]"
        >
          <View className="items-start">
            <Text className="text-primary text-[12px] font-bold tracking-[2px] mb-3">
              PREMIUM STREAMING
            </Text>
            <Text className="text-surface text-[48px] font-extrabold leading-[56px] mb-4">
              NadPlay
            </Text>
            <Text className="text-surface-variant text-[16px] leading-[24px] mb-10 max-w-[90%]">
              Experience cinema like never before. Dive into a curated collection of high-stakes editorial picks.
            </Text>

            <TouchableOpacity
              className="w-full rounded-[30px] overflow-hidden elevation-10"
              style={{
                shadowColor: 'var(--primary)',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 20,
              }}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['var(--primary)', 'var(--primary-container)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="py-[18px] items-center justify-center"
              >
                <Text className="text-on-primary text-[18px] font-bold">Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Onboarding;

