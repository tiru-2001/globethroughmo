import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import {
  AntDesign,
  Feather,
  Fontisto,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
const { width, height } = Dimensions.get("window");
const Account = () => {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.accHolderDetails}>
          <View style={styles.iconTextWrap}>
            <Feather
              name="phone"
              size={18}
              color="#FFFFFF"
              style={styles.emptyIcon}
            />
            <Text style={styles.name}>Hi User</Text>
          </View>
          <View style={styles.iconTextWrap}>
            <Feather
              name="phone"
              size={18}
              color="#FFFFFF"
              style={styles.icon}
            />
            <Text style={styles.phNumber}> "xxxxxxxxxx"</Text>
          </View>
          <View style={styles.iconTextWrap}>
            <Fontisto
              name="email"
              size={18}
              color={"#FFFFFF"}
              style={styles.icon}
            />
            <Text style={styles.emailId}>{"user@gmail.com"}</Text>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.secondDiv}>
        <View style={styles.personalInfoMain}>
          <Link href={"/(tabs)/(account)/personalInfo"}>
            <SimpleLineIcons name="user" size={30} color="#000" />
          </Link>
          <Link href={"/(tabs)/(account)/personalInfo"}>
            <View>
              <Text style={styles.infoHeading}>Personal Information</Text>
              <Text style={styles.infoSubHeading}>
                Update and manage your personal details easily
              </Text>
            </View>
          </Link>
        </View>
        <View style={styles.personalInfoMain}>
          <Link href={"/(tabs)/(account)/customerservice"}>
            <AntDesign name="customerservice" size={28} color="#000" />
          </Link>
          <Link href={"/(tabs)/(account)/customerservice"}>
            <View>
              <Text style={styles.infoHeading}>Customer Service</Text>
              <Text style={styles.infoSubHeading}>
                Get help and support anytime.
              </Text>
            </View>
          </Link>
        </View>
        <View style={styles.personalInfoMain}>
          <TouchableOpacity>
            <AntDesign name="sharealt" size={26} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <Text style={styles.infoHeading}>Refer App</Text>
              <Text style={styles.infoSubHeading}>
                Invite friends and earn rewards.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.personalInfoMain}>
          <AntDesign name="filetext1" size={26} color="#000" />
          <View>
            <Text style={styles.infoHeading}>Privacy Policy</Text>
            <Text style={styles.infoSubHeading}>
              Invite friends and earn rewards.
            </Text>
          </View>
        </View>
        <View style={styles.personalInfoMain}>
          <SimpleLineIcons name="logout" size={25} color="#000" />
          <View>
            <Text style={styles.infoHeading}>Log out</Text>
            <Text style={styles.infoSubHeading}>
              Invite friends and earn rewards.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1B5F54",
  },

  iconTextWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: width * 0.025,
  },
  accHolderDetails: {
    gap: 12,
    marginTop: height * 0.035,
    marginBottom: height * 0.035,
    marginLeft: 40,
  },
  name: {
    color: "white",
    fontSize: width * 0.045,
    // fontWeight: 400,
    fontFamily: "Satoshi-Bold",
  },
  phNumber: {
    color: "#ffffff",
    fontSize: width * 0.035,
    fontFamily: "Satoshi-Bold",
  },
  emailId: {
    color: "#ffffff",
    fontSize: width * 0.035,
    fontFamily: "Satoshi-Bold",
  },
  personalInfoMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: width * 0.06,
    marginTop: height * 0.03,
    marginLeft: 8,
    // backgroundColor:"red"
  },
  textWrapperInfo: {
    flexDirection: "column",
    width: width * 0.75,
    height: height * 0.05,
    top: height * 0.07,
    left: width * 0.02,
  },
  infoHeading: {
    fontWeight: 500,
    marginTop: height * 0.005,
    fontSize: width * 0.04,
    fontFamily: "Satoshi-Bold",
  },
  infoSubHeading: {
    color: "#9D9292",
    marginTop: height * 0.005,
    fontSize: width * 0.033,
    fontFamily: "Satoshi-Medium",
  },
  secondDiv: {
    left: height * 0.03,
  },
  emptyIcon: {
    marginRight: width * 0.025,
    color: "#1B5F54",
  },
});

export default Account;
