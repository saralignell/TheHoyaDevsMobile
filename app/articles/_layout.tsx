import { Stack } from "expo-router";

export default function ArticlesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: true,
        gestureResponseDistance: { start: 0, end: 100 },
      }}
    />
  );
}
