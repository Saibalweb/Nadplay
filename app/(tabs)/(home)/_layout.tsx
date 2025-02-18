import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function HomeLayout(){
    return (
        <Stack
        screenOptions={{
            headerShown: false,
          }}>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="moviedetails" options={{ headerShown: false }} />
        </Stack>
    );
}