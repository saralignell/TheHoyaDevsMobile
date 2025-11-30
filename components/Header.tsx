import React from "react";
import { View, Image, Pressable, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type HeaderProps = {
  onArticlePage?: boolean;
};

const Header = ({ onArticlePage }: HeaderProps) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.navigate("/")}>
        {onArticlePage && (
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            style={styles.backArrow}
            onPress={() => router.back()}
          />
        )}
        <Image source={require("../assets/logo.png")} style={styles.logo} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === "ios" ? 90 : 60, // Standard height for a news app header
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center logo
    backgroundColor: "#094C9F", // Blue background
    paddingHorizontal: 16, // Standard horizontal padding
    paddingBottom: 5,
    paddingTop: Platform.OS === "ios" ? 40 : 0, // Adjust for iOS status bar
  },
  logo: {
    width: 120, // Standard logo width
    height: 40, // Standard logo height
    resizeMode: "contain", // Ensures logo scales well
  },
  icon: {
    position: "absolute", // Position search icon independently
    right: 16, // Align to the right
    paddingRight: 8, // Adjust touchable area for better UX
    paddingTop: 40,
  },
  backArrow: {
    position: "absolute",
    left: -125,
    paddingRight: 8,
    paddingTop: 10,
  },
});

export default Header;
