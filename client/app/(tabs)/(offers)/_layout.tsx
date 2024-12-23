import { Stack } from "expo-router";

const OfferLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="offers" options={{ headerShown: false }} />
    </Stack>
  );
};

export default OfferLayout;
