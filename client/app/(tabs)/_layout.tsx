import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#01493E",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "light",
        },
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          paddingVertical: 10,
          height: 60,
        },
        tabBarItemStyle: {
          borderRadius: 10,
          marginHorizontal: 5,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="home-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(packages)"
        options={{
          title: "Package",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="clipboard-check-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(booking)"
        options={{
          title: "Booking",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="ticket-outline"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(offers)"
        options={{
          title: "Offers",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="sale" color={color} />
          ),
          tabBarItemStyle: {
            borderColor: "green",
          },
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          title: "Account",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="account-circle-outline"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
