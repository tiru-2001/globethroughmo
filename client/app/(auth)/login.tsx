import {
  Alert,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { dropdownItems } from "@/types";
import { dropDownItemsForCountryCodes } from "@/utilities";
import { RadioButton } from "react-native-paper";
import DatePicker from "react-native-date-picker";
WebBrowser.maybeCompleteAuthSession();
const Login = () => {
  const [eamilError, setEmailError] = useState<boolean>(false);
  const [user, setUserInfo] = useState("");
  const [isPickerVisible, setPickerVisible] = useState(true);
  const [items, setItems] = useState<dropdownItems[]>(
    dropDownItemsForCountryCodes
  );
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<number>(+91);
  const [showOtp, setshowOtp] = useState<boolean>(false);
  const [showDate, setShowDate] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "976309322522-5p417d7kkhqk48jctscng6hlqonc02rr.apps.googleusercontent.com",
    iosClientId:
      "976309322522-murbeaaio54t2183ku8u9fvbj5ka7ooa.apps.googleusercontent.com",
    webClientId:
      "976309322522-l9onlhdmbgtonr3h0gbboni53a5l0fib.apps.googleusercontent.com",
  });
  /* it is used validate email field*/
  const validateFormFields = (value: string): void => {
    const result = /\S+@\S+\.\S+/.test(value);
    setEmailError(result);
  };
  /*This function is used to handle google login*/

  const handleSignInWithGoogle = async (): Promise<any> => {
    await AsyncStorage.removeItem("@user");
    try {
      const user = await AsyncStorage.getItem("@user");
      if (!user) {
        if (response?.type === "success") {
          const data = await getUserInfo(response?.authentication?.accessToken);
          console.log("data");
          console.log(data);
        }
      } else {
        setUserInfo(JSON.parse(user));
      }
    } catch (e: unknown) {
      console.log(e);
      if (e instanceof Error) {
        console.log(e);
      }
    }
  };
  /*get user info*/
  const getUserInfo = async (token: any): Promise<any> => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      console.log("inside user");
      console.log(user?.email);
      console.log(user);
      const backendData = await axios.post(
        "http://localhost:8500/api/v1/auth/google-login",
        {
          email: user?.email,
          name: user?.name,
        }
      );
      console.log(user);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log;
      }
    }
  };
  // const saveUserDatatoDb = async (): Promise<any> => {
  //   try {
  //     const { data } = await console.log(data);
  //   } catch (e: unknown) {
  //     if (e instanceof Error) {
  //       console.log(e);
  //     }
  //   }
  // };

  const handleLoginWithOtp = () => {
    setshowOtp((prev) => !prev);
  };
  React.useEffect(() => {
    console.log("hello");
    handleSignInWithGoogle();
  }, [response]);

  const handleData = (event: any, selectedDate?: Date): void => {
    setShowDate(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleConfirm = (selectedDate: any) => {
    setPickerVisible(false);
    setDate(selectedDate);
  };

  return (
    // <ScrollView
    //   contentContainerStyle={{
    //     flexGrow: 1,
    //     backgroundColor: "#01493E",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    //   showsVerticalScrollIndicator={true}
    // >
    //   {showOtp ? (
    //     <View style={styles.otpcontainer}>
    //       <View style={styles.otpInnerContainer}>
    //         <TextInput style={styles.otpFields} keyboardType="numeric" />
    //         <TextInput style={styles.otpFields} keyboardType="numeric" />{" "}
    //         <TextInput style={styles.otpFields} keyboardType="numeric" />{" "}
    //         <TextInput style={styles.otpFields} keyboardType="numeric" />
    //       </View>
    //       <View style={styles.resendOtp}>
    //         <Text style={styles.time}>0:29</Text>
    //         <Text style={styles.resendOtptext}>Resend Otp</Text>
    //       </View>
    //     </View>
    //   ) : (
    //     <View style={styles.innerContainer}>
    //       <View>
    //         <Text style={styles.headerText}>Enter your phone number </Text>
    //         <Text style={styles.headerSubText}>
    //           We will send you 4 digit verification code
    //         </Text>
    //       </View>
    //       <View style={styles.formContainer}>
    //         <View style={styles.inputContainer}>
    //           <View style={styles.dropdown}>
    //             <Text>+{value}</Text>
    //             <Text style={styles.dropdownicon}>
    //               <Ionicons
    //                 onPress={() => {
    //                   setOpen((prev) => !prev);
    //                 }}
    //                 name={"chevron-down"}
    //                 size={15}
    //               />
    //             </Text>
    //           </View>
    //           {open && (
    //             <ScrollView style={styles.dropDownContents}>
    //               <FlatList
    //                 data={items}
    //                 renderItem={({ item }) => (
    //                   <TouchableOpacity
    //                     onPress={() => {
    //                       setValue(item.value);
    //                       setOpen(false);
    //                     }}
    //                     style={styles.listItem}
    //                   >
    //                     <Text>{item.label}</Text>
    //                   </TouchableOpacity>
    //                 )}
    //                 keyExtractor={(item) => item.label}
    //               />
    //             </ScrollView>
    //           )}

    //           <TextInput
    //             placeholder="Enter phone number"
    //             style={styles.inputFields}
    //             keyboardType="numeric"
    //             maxLength={10}
    //           />
    //         </View>
    //         <View style={styles.signInBtnContainer}>
    //           <Pressable onPress={handleLoginWithOtp} style={styles.siginBtn}>
    //             <Text style={styles.signinText}>Send OTP</Text>
    //           </Pressable>
    //         </View>
    //         <View style={styles.linesContainer}>
    //           <View style={styles.line} />
    //           <Text style={styles.signupGoogleText}>Signup with Google</Text>
    //           <View style={styles.line} />
    //         </View>
    //       </View>
    //       <View style={[styles.signInBtnContainer]}>
    //         <Pressable
    //           onPress={() => {
    //             promptAsync();
    //           }}
    //           style={[styles.siginBtn, styles.signupBtn]}
    //         >
    //           <Text style={[styles.signinText, styles.signupText]}>
    //             Signup with Google
    //           </Text>
    //           <Image
    //             style={{ height: 20, width: 20 }}
    //             source={{
    //               uri: "https://cdn-icons-png.flaticon.com/128/300/300221.png",
    //             }}
    //           />
    //         </Pressable>
    //       </View>
    //     </View>
    //   )}
    //   <StatusBar backgroundColor="#01493E" style="light" />
    // </ScrollView>
    <View style={styles.passengerDetailsContainer}>
      <View>
        <Text style={styles.headerText}>Passenger 1. Adult</Text>
      </View>
      <View style={styles.radioBtnContainer}>
        <View style={styles.radioBtnInnerContainer}>
          <Text>Male</Text>
          <RadioButton status={"checked"} value="male" />
        </View>
        <View style={styles.radioBtnInnerContainer}>
          <Text>Female</Text>
          <RadioButton status="checked" value="female" />
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholderTextColor={"gray"}
          style={styles.inputFields}
          placeholder="First name"
        />
        <TextInput
          placeholderTextColor={"gray"}
          style={styles.inputFields}
          placeholder="Last Name"
        />

        <TouchableOpacity
          onPress={() => setShowDate((prev) => !prev)}
          style={styles.dateContainer}
        >
          {!date ? (
            <Text style={styles.dobPlaceholder}>Date of Birth(optional)</Text>
          ) : (
            <Text style={styles.dobText}>{date.toLocaleDateString()}</Text>
          )}
          <View style={styles.date_icon_container}>
            <Ionicons
              style={styles.dateIcon}
              color={"gray"}
              size={25}
              name="calendar"
            />
            {Platform.OS == "android" ? (
              showDate && (
                <DateTimePicker
                  style={styles.datePicker}
                  value={date}
                  mode="date"
                  display="compact"
                  onChange={handleData}
                />
              )
            ) : (
              <DateTimePicker
                style={styles.datePicker}
                value={date}
                mode="date"
                display="compact"
                onChange={handleData}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   innerContainer: {
//     paddingHorizontal: 10,
//     flexDirection: "column",
//     gap: 20,
//     width: "90%",
//   },
//   headerText: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   headerSubText: {
//     marginTop: 5,
//     fontSize: 12,
//     color: "#D9D9D9",
//     fontWeight: "400",
//   },
//   formContainer: {
//     flexDirection: "column",
//     gap: 20,

//     borderColor: "violet",
//   },
//   inputContainer: {
//     borderColor: "red",
//     display: "flex",
//     flexDirection: "row",
//     gap: 5,
//   },
//   label: {
//     color: "#fff",
//     paddingBottom: 4,
//   },
//   inputFields: {
//     padding: 12,
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     borderColor: "blue",
//     flex: 1,
//   },

//   signInBtnContainer: {
//     display: "flex",
//     flexDirection: "column",
//     backgroundColor: "#01322B",
//     borderRadius: 5,
//   },
//   siginBtn: {
//     padding: 16,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 5,
//   },
//   signinText: {
//     color: "#fff",
//     fontWeight: "500",
//   },

//   linesContainer: {
//     flexDirection: "row",
//     gap: 4,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   line: {
//     height: 1,
//     backgroundColor: "#D9D9D9",
//     flex: 1,
//   },
//   signupGoogleText: {
//     fontSize: 12,
//     color: "#D9D9D9",
//   },
//   signupBtn: {
//     backgroundColor: "#fff",
//     flexDirection: "row-reverse",
//     padding: 16,
//     gap: 25,
//   },
//   signupText: {
//     color: "#000",
//   },
//   dropdown: {
//     width: 60,
//     zIndex: 999,
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     gap: 3,
//   },
//   dropDownContents: {
//     display: "flex",
//     gap: 10,
//     flexDirection: "column",
//     position: "absolute",
//     backgroundColor: "#fff",
//     borderRadius: 5,
//     top: "120%",
//     padding: 10,
//     right: 0,
//     left: 0,
//     zIndex: 9999,
//   },
//   listItem: {
//     marginVertical: 5,
//     padding: 10,
//   },
//   dropdownicon: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     cursor: "pointer",
//   },
//   otpcontainer: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//   },
//   otpInnerContainer: {
//     display: "flex",
//     flexDirection: "row",
//     gap: 10,
//   },
//   otpFields: {
//     height: 50,
//     width: 50,
//     borderRadius: 5,
//     backgroundColor: "#fff",
//   },
//   resendOtp: {
//     display: "flex",
//     alignItems: "center",
//     flexDirection: "row",

//     gap: 10,
//   },
//   time: {
//     color: "gray",
//   },
//   resendOtptext: {
//     color: "#fff",
//   },
// });
const styles = StyleSheet.create({
  passengerDetailsContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
  },
  radioBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  radioBtnInnerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputFields: {
    padding: 10,
    borderWidth: 0,
    borderBottomWidth: 0.5,
  },
  dateContainer: {
    // borderWidth: 0,
    borderColor: "black",
    width: "100%",
    padding: 8,
    color: "gray",
    borderBottomWidth: 0.5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dobPlaceholder: {
    color: "gray",
  },
  dobText: {
    color: "black",
  },
  datePicker: {
    padding: 0,
    marginBottom: 150,
    position: "absolute",
    left: -30,
    top: -10,
    borderWidth: 1,
    zIndex: 99,
    opacity: 0.012,
  },
  date_icon_container: {
    position: "relative",
    height: 30,
    width: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
  dateIcon: {
    // height: "100%",
    // width: "100%",
    position: "absolute",
    zIndex: 9,
    cursor: "pointer",
  },
});
export default Login;
