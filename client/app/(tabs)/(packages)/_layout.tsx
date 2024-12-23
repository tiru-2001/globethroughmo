import { Stack } from "expo-router";

const PackageLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="packages" options={{ headerShown: false }} />
    </Stack>
  );
};
export default PackageLayout;
