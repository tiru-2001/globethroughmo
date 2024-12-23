import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};
export default RootLayout;
