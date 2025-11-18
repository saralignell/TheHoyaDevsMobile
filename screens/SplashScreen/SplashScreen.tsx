import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, Text, Animated } from "react-native";

interface SplashScreenProps {
  timeoutDuration: number;
}

export default function AnimatedSplashScreen({
  timeoutDuration,
}: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: timeoutDuration / 3,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const getDate: () => string = () => {
    return new Date().toLocaleDateString("en-US", {
      timeZone: "UTC",
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splash.png")}
        style={{ width: "62%", height: "62%" }}
        resizeMode="contain"
      />
      <Animated.View
        style={{ opacity: fadeAnim, position: "absolute", bottom: 250 }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 24,
            fontFamily: "SourceSerifPro_400Regular",
          }}
        >
          {getDate()}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#034da2",
    position: "absolute",
  },
});
