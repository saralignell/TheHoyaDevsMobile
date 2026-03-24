import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Appearance } from "react-native";

let colorScheme = Appearance.getColorScheme();

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "#000714" : "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="newspaper-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="library-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sports"
        options={{
          title: "Sports",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="basketball-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crossword"
        options={{
          title: "Crossword",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="pencil-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="search-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
