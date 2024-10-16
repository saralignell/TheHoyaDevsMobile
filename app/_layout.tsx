import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* This will serve as the landing page for featured news */}
      <Stack.Screen name="index" options={{ title: "Featured News" }} />
    </Stack>
  );
}
