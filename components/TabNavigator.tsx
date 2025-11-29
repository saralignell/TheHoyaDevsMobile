import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Index from "../screens/HomePage/HomePage";
import Header from "../components/Header";
import Searchpage from "./Searchpage";
import ArticlePage from "../screens/ArticlePage/ArticlePage";
import CrosswordPage from "../screens/CrosswordPage/CrosswordPage";
import categoriespage from "../screens/CategoriesPage/CategoriesPage";
import AuthorPage from "../screens/AuthorPage/AuthorPage";
import GamesPage from "../screens/GamesPage/GamesPage";
import * as Linking from "expo-linking";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix],
  config: {
    screens: {
      Home: {
        screens: {
          Home: "home",
          Article: "article/:id",
        },
      },
      Search: "search",
      Sections: "categories",
      Sports: "sports",
      Crossword: "crossword",
    },
  },
};

const NewsStack = ({ setIsReady }) => (
  useEffect(() => {
    console.log("Stack mounted");
    return () => {
      console.log("TabNavigator unmounted");
    };
  }, []),
  (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Featured News"
        component={Index}
        initialParams={{ setIsReady }}
      />
      <Stack.Screen
        name="Article"
        component={ArticlePage}
        initialParams={{ id: 0 }}
      />
      <Stack.Screen name="Author" component={AuthorPage} />
    </Stack.Navigator>
  )
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
    <Stack.Screen name="Author" component={AuthorPage} />
  </Stack.Navigator>
);

const GamesStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Games" component={GamesPage} />
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
    <Stack.Screen name="Author" component={AuthorPage} />
  </Stack.Navigator>
);

const TabNavigator = ({ setIsReady }) => (
  <View style={styles.container}>
    <Header onArticlePage={false} />
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
      <Tab.Screen name="Home">
        {() => <NewsStack setIsReady={setIsReady} />}
      </Tab.Screen>
      <Tab.Screen name="Sections" component={CategoriesStack} />
      <Tab.Screen name="Sports" component={GamesStack} />
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
    case "Sports":
      return "basketball-outline";
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
