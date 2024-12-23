import { Slot } from "expo-router";
import { StyleSheet, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Layout = () => {
  return (
    <SafeAreaView style={styles.authLayout}>
      <Slot />
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  authLayout: {
    flex: 1,
    margin: 0,
  },
});
