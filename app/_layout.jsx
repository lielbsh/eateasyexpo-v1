import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Link, Stack, SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationProvider } from '../components/navigation/navigationGuard';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Pacifico-Regular": require("../assets/fonts/Pacifico-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
    }, [fontsLoaded, error]);

    if (!fontsLoaded) {
      return null;
    }

    if (!fontsLoaded && !error) {
      return null;
    }

  return (
    <GestureHandlerRootView>
      <NavigationProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="(auth)" options={{ headerShown: false}} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      </Stack>
      </NavigationProvider>
    </GestureHandlerRootView>
  );
}


