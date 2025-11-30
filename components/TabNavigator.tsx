import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Stack, Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "../components/Header";

const TabNavigator = () => (
  <Tabs
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "#1E90FF",
      tabBarInactiveTintColor: "gray",
    }}
  >
    <Tabs.Screen
      name="index"
      options={{
        title: "Home",
        tabBarIcon: ({ color }) => (
          <Ionicons size={28} name="newspaper-outline" color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="categories"
      options={{
        title: "Categories",
        tabBarIcon: ({ color }) => (
          <Ionicons size={28} name="library-outline" color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="sports"
      options={{
        title: "Sports",
        tabBarIcon: ({ color }) => (
          <Ionicons size={28} name="basketball-outline" color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="crossword"
      options={{
        title: "Crossword",
        tabBarIcon: ({ color }) => (
          <Ionicons size={28} name="pencil-outline" color={color} />
        ),
      }}
    />
    <Tabs.Screen
      name="search"
      options={{
        title: "Search",
        tabBarIcon: ({ color }) => (
          <Ionicons size={28} name="search-outline" color={color} />
        ),
      }}
    />
  </Tabs>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 90, // Standard height for a news app header
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center logo
    backgroundColor: "#094C9F", // Blue background
    paddingHorizontal: 16, // Standard horizontal padding
    paddingBottom: 5,
    paddingTop: 40,
  },
  backButton: {
    position: "absolute",
    left: 16,
    paddingRight: 8,
    paddingTop: 40,
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
});

export default TabNavigator;
