import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Appearance } from "react-native";
import { requestNotificationPermission } from "../helpers/notifications";
import {
  useFonts,
  SourceSerifPro_300Light,
  SourceSerifPro_400Regular,
  SourceSerifPro_400Regular_Italic,
  SourceSerifPro_600SemiBold,
} from "@expo-google-fonts/source-serif-pro";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplashScreen from "../components/SplashScreen";
import * as Linking from "expo-linking";
import Header from "../components/Header";
import { Stack } from "expo-router";
import messaging from "@react-native-firebase/messaging";

SplashScreen.preventAutoHideAsync();
let colorScheme = Appearance.getColorScheme();

function handleNotificationOpen(remoteMessage: any): string | undefined {
  if (remoteMessage && remoteMessage.data && remoteMessage.data.articleId) {
    const articleId = remoteMessage.data.articleId;
    return `/articles/${articleId}`;
  }
}

export const HeaderContext = React.createContext<{
  onArticlePage: boolean;
  setOnArticlePage: (value: boolean) => void;
  onFeaturedPage: boolean;
  setOnFeaturedPage: (value: boolean) => void;
}>({
  onArticlePage: false,
  setOnArticlePage: () => {},
  onFeaturedPage: false,
  setOnFeaturedPage: () => {},
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SourceSerifPro_300Light,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
  });

  const [isReady, setIsReady] = React.useState(false);
  const [isSplashReady, setIsSplashReady] = React.useState(false);
  const splashTimeout = 3000; // Minimum splash screen duration in milliseconds
  const [onArticlePage, setOnArticlePage] = React.useState(false);
  const [onFeaturedPage, setOnFeaturedPage] = React.useState(false);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage,
          );
          const url = handleNotificationOpen(remoteMessage);
          if (url) {
          }
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage,
      );
      const url = handleNotificationOpen(remoteMessage);
      if (url) {
        Linking.openURL(url);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loaded) {
      setIsSplashReady(true);
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 200);
      setTimeout(() => {
        //after the timeout, hide the splash screen and show the app
        setIsSplashReady(false);
      }, splashTimeout);
    }
  }, [loaded]);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await requestNotificationPermission();
      } catch (err) {
        console.log("Notification permission denied", err);
      }
    };
    requestPermissions();
  }, []);

  if (!loaded && !error && !isReady) {
    return null;
  }

  return (
    <HeaderContext.Provider
      value={{
        onArticlePage,
        setOnArticlePage,
        onFeaturedPage,
        setOnFeaturedPage,
      }}
    >
      <View style={styles.container}>
        <Header />

        <Stack
          screenOptions={{
            headerShown: false,
            fullScreenGestureEnabled: false,
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="articles" options={{ headerShown: false }} />
          <Stack.Screen
            name="authors/[authorId]"
            options={{ headerShown: false }}
          />
        </Stack>
        {isSplashReady && <AnimatedSplashScreen timeoutDuration={3000} />}
      </View>
    </HeaderContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorScheme === "dark" ? "#000714" : "#fff",
    width: "100%",
    height: "100%",
  },
});
