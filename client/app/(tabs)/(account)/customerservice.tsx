import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign, EvilIcons, Feather, Fontisto } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
const { width, height } = Dimensions.get("window");
const customerService = () => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.textWrapper}>
          <View style={styles.backarrow}>
            <TouchableOpacity onPress={router.back}>
              <AntDesign name="arrowleft" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.personalInfoTitle}>Customer Service</Text>
            <Text style={styles.subTitle}>Get help and support anytime</Text>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <View style={styles.secondDivWrapper}>
          <View style={styles.chatCusImage}>
            <Feather name="message-square" size={24} color="#000" />
          </View>
          <View>
            <Text style={styles.customTitle}>Chat with us</Text>
            <Text style={styles.customSubTitle}>
              Chat with our team and get solution
            </Text>
          </View>
        </View>
        <View style={styles.thirdDivWrapper}>
          <TouchableOpacity style={styles.chatCusImage}>
            <Feather name="phone" size={24} color="#000" />
            {/* source={require("../assets/images/phoneIcon.png")} */}
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.customTitle}>+919945305778</Text>
            <Text style={styles.customSubTitle}>Call us and get solution</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default customerService;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B5F54",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
  },

  textWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: height * 0.08,
    paddingBottom: height * 0.03,
    paddingRight: width * 0.25,
  },

  secondDivWrapper: {
    marginTop: height * 0.04,
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.05,
  },

  thirdDivWrapper: {
    marginTop: height * 0.04,
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.05,
  },

  chatCusImage: {
    marginLeft: width * 0.08,
  },

  backarrow: {
    paddingRight: width * 0.08,
  },

  personalInfoTitle: {
    color: "white",
    fontSize: width * 0.04,
    fontWeight: "500",
    fontFamily: "Satoshi-Bold",
  },

  subTitle: {
    color: "#d9d9d9",
    fontSize: width * 0.035,
    fontFamily: "Satoshi-Regular",
  },

  customTitle: {
    fontSize: width * 0.04,
    fontWeight: "600",
    fontFamily: "Satoshi-Bold",
  },

  customSubTitle: {
    fontSize: width * 0.03,
    paddingTop: height * 0.01,
    fontFamily: "Satoshi-Bold",
  },
});
