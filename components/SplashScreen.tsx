import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import logo from './assets/images/logo.png';

interface SplashScreenProps {
  isLoading: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={styles.splashScreen}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
