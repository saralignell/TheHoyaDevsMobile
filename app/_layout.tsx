import React from "react";
import { View, StyleSheet } from "react-native";
import TabNavigator from "../components/TabNavigator";
import {
  useFonts,
  SourceSerifPro_300Light,
  SourceSerifPro_400Regular,
  SourceSerifPro_400Regular_Italic,
  SourceSerifPro_600SemiBold,
} from "@expo-google-fonts/source-serif-pro";
import * as SplashScreen from "expo-splash-screen";
import AnimatedSplashScreen from "../screens/SplashScreen/SplashScreen";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SourceSerifPro_300Light,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
  });

  const [isReady, setIsReady] = React.useState(false);
  const [isSplashReady, setIsSplashReady] = React.useState(false);
  const splashTimeout = 2000; // Minimum splash screen duration in milliseconds

  React.useEffect(() => {
    if (isReady && loaded) {
      console.log("Fonts and app are ready");
      // when we have articles loaded, show the animated splash
      setIsSplashReady(true);
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
      setTimeout(() => {
        //after the timeout, hide the splash screen and show the app
        setIsSplashReady(false);
      }, splashTimeout);
    }
  }, [isReady]);

  if (!loaded && !error && !isReady) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TabNavigator setIsReady={setIsReady} />
      {isSplashReady && (
        <AnimatedSplashScreen timeoutDuration={splashTimeout} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
