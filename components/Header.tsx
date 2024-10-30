import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon library

const Header = () => (
  <View style={styles.header}>
    <Image source={require('../assets/logo.png')} style={styles.logo} />
    <TouchableOpacity style={styles.icon}>
      <Ionicons name="search" size={28} color="white" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 70, // Standard height for a news app header
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#094C9F', // Blue background
    paddingHorizontal: 16, // Standard horizontal padding
    paddingBottom: 5,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Handle Android StatusBar
    
  },
  logo: {
    width: 120, // Standard logo width
    height: 40, // Standard logo height
    resizeMode: 'contain', // Ensures logo scales well
  },
  icon: {
    padding: 8, // Adjust touchable area for better UX
  },
});

export default Header;
