import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icon library
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Header = () => {
  const navigation = useNavigation<any>(); // Get the navigation object

  return (
    <View style={styles.header}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Search')}>
        <Ionicons name="search" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 90, // Standard height for a news app header
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center logo
    backgroundColor: '#094C9F', // Blue background
    paddingHorizontal: 16, // Standard horizontal padding
    paddingBottom: 5,
    paddingTop: 40,
  },
  logo: {
    width: 120, // Standard logo width
    height: 40, // Standard logo height
    resizeMode: 'contain', // Ensures logo scales well
  },
  icon: {
    position: 'absolute', // Position search icon independently
    right: 16, // Align to the right
    paddingRight: 8, // Adjust touchable area for better UX
    paddingTop: 40,
  },
});

export default Header;