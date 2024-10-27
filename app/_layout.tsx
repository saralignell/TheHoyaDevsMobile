import { Stack } from "expo-router";
import React, { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        //fill in loading logic
      } catch (error) {
        console.error("Error loading app data:", error);
      } finally {
        setIsLoading(false); //this will hides the splash screen once loading is complete
      }
    };

    loadAppData();
  }, []);

  return (
    <>
      <SplashScreen isLoading={isLoading} />
      {!isLoading && (
        <Stack>
          {/* This will serve as the landing page for featured news */}
          <Stack.Screen name="index" options={{ title: "Featured News" }} />
        </Stack>
      )}
    </>
  );
}
