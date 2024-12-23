import { Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const AccountLayout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        gestureEnabled: true,
        animationDuration: 500,
      }}
    >
      <Stack.Screen name="account" options={{ headerShown: false }} />
      <Stack.Screen name="customerservice" options={{ headerShown: false }} />
      <Stack.Screen
        name="personalInfo"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#1B5F54",
          },
          headerShadowVisible: false,
          headerTitle: "",
          headerTintColor: "#fff",
        }}
      />
    </Stack>
  );
};

export default AccountLayout;

//  <Stack.Screen
//    name="personalInfo"
//    options={{
//      header: ({ navigation }) => (
//        <View
//          style={{
//            borderWidth: 2,
//            height: 50, // Custom height
//            backgroundColor: "#1B5F54",
//            justifyContent: "center",
//            paddingHorizontal: 10,
//          }}
//        >
//          <TouchableOpacity onPress={() => navigation.goBack()}>
//            <Text style={{ color: "#fff", fontSize: 18 }}>Back</Text>
//          </TouchableOpacity>
//        </View>
//      ),
//    }}
//  />;
