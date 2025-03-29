import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Index from "../screens/HomePage/HomePage";
//import ArticleScreen from '../app/ArticleScreen'; // Import the ArticleScreen
//import { ArticleScreenRouteProp } from '../app/ArticleScreen'; // Import the ArticleScreenRouteProp type
import Header from "../components/Header";
import Searchpage from "./Searchpage";
import ArticlePage from "../screens/ArticlePage/ArticlePage";
import CrosswordPage from "../screens/CrosswordPage/CrosswordPage";
import categoriespage from "../screens/CategoriesPage/CategoriesPage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const NewsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Featured News" component={Index} />
    <Stack.Screen
      name="Article"
      component={ArticlePage}
      initialParams={{ id: 0 }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Search" component={Searchpage} />
    <Stack.Screen
      name="Article"
      component={ArticlePage}
      initialParams={{ id: 0 }}
    />
  </Stack.Navigator>
);

const CategoriesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Categories" component={categoriespage} />
    <Stack.Screen
      name="Article"
      component={ArticlePage}
      initialParams={{ id: 0 }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <View style={styles.container}>
    <Header />
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName: keyof typeof Ionicons.glyphMap = getIconName(
            route.name
          );
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1E90FF",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={NewsStack} />
      <Tab.Screen name="Sections" component={CategoriesStack} />
      <Tab.Screen name="Crossword" component={CrosswordPage} />
      <Tab.Screen name="Search" component={SearchStack} />
    </Tab.Navigator>
  </View>
);

function getIconName(routeName: string): keyof typeof Ionicons.glyphMap {
  switch (routeName) {
    case "Home":
      return "newspaper-outline";
    case "Search":
      return "search-outline";
    case "Crossword":
      return "pencil-outline";
    case "Sections":
      return "library-outline";
    default:
      return "help-outline";
  }
}

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
