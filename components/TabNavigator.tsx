// components/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Index from './../app/index';
// import BrowseCategories from '../screens/BrowseCategories';
// import Trending from '../screens/Trending';
// import Crossword from '../screens/Crossword';
// components/TabNavigator.tsx

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        const iconName: keyof typeof Ionicons.glyphMap = getIconName(route.name);

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#1E90FF',
      tabBarInactiveTintColor: 'gray',
    })}
  >
    <Tab.Screen name="Featured News" component={Index} />

  </Tab.Navigator>
);

function getIconName(routeName: string): keyof typeof Ionicons.glyphMap {
  switch (routeName) {
    case 'Featured News':
      return 'newspaper-outline';
    case 'Browse Categories':
      return 'grid-outline';
    case 'Trending':
      return 'flame-outline';
    case 'Crossword':
      return 'pencil-outline';
    default:
      return 'alert-circle-outline'; // Fallback icon
  }
}

export default TabNavigator;

