// app/layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <Header />
      <Stack>
        <Stack.Screen 
          name="(tabs)" // Reference the folder containing your Tab Navigator
          options={{ headerShown: false }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
