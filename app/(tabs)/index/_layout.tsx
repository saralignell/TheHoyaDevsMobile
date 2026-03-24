import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        fullScreenGestureEnabled: false,
        gestureResponseDistance: { start: 20, end: 30 },
      }}
    />
  );
}
