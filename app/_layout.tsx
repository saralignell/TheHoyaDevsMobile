import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from '../components/TabNavigator'; // Import your TabNavigator

export default function RootLayout() {
  return (

      <View style={styles.container}>
        <TabNavigator />
      </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});