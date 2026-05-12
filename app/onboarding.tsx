import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

// Design Tokens from Stitch Cinematic Editorial
const COLORS = {
  background: '#111318',
  primary: '#ffb692',
  primaryContainer: '#ff7d33',
  onSurface: '#e2e2e8',
  onSurfaceVariant: '#dfc0b3',
};

const Onboarding = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require('../assets/images/onboarding.png')}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(17, 19, 24, 0.8)', '#111318']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={styles.label}>PREMIUM STREAMING</Text>
            <Text style={styles.title}>NadPlay</Text>
            <Text style={styles.description}>
              Experience cinema like never before. Dive into a curated collection of high-stakes editorial picks.
            </Text>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    width: width,
    height: height,
    justifyContent: 'flex-end',
  },
  gradient: {
    height: height * 0.6,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
  content: {
    alignItems: 'flex-start',
  },
  label: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 56,
    marginBottom: 16,
    // Manrope or similar geometric font would be ideal here
  },
  description: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: '90%',
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 30,
    overflow: 'hidden',
    // Glow effect
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  button: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#562000', // on_primary from Stitch
    fontSize: 18,
    fontWeight: 'bold',
  },
});
