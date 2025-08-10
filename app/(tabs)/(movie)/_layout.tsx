import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function MovieLayout(){
    return (
        <Stack
        screenOptions={{
            headerShown: false,
          }}>
        <Stack.Screen name="movie" options={{ headerShown: false }} />
        <Stack.Screen name="moviedetails" options={{ headerShown: false }} />
        </Stack>
    );
}