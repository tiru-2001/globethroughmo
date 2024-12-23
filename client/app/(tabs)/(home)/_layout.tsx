import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="flightResult" options={{ headerShown: false }} />
      <Stack.Screen name="ticketdetails" options={{ headerShown: false }} />
      <Stack.Screen name="passengerdetails" options={{ headerShown: false }} />
      <Stack.Screen
        name="addon"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
