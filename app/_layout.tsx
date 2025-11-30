import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
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

const linking = {
  prefixes: [Linking.createURL("/")],
};

function handleNotificationOpen(remoteMessage: any): string | undefined {
  if (remoteMessage && remoteMessage.data && remoteMessage.data.articleId) {
    const articleId = remoteMessage.data.articleId;
    return Linking.createURL(`/articles/${articleId}`);
  }
}

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

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage
          );
          const url = handleNotificationOpen(remoteMessage);
          if (url) {
            Linking.openURL(url);
          }
        }
      });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage
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
      console.log("Fonts and app are ready");
      setTimeout(() => {
        setIsSplashReady(true);
      }, 1000);
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
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
        console.log("Notification permission granted");
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
    <View style={styles.container}>
      <Header onArticlePage={false} />
      {isSplashReady && <AnimatedSplashScreen timeoutDuration={3000} />}
      <Stack
        screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="articles" options={{ headerShown: false }} />
        <Stack.Screen
          name="authors/[authorId]"
          options={{ headerShown: false }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },
});
