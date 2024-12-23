import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Appearance,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFlightAppData } from "@/statemanagement/store";
import { Dimensions } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather"; // For Feather Icons
import { TextInput } from "react-native-paper";
import Passengerdetails from "@/components/passengerdetails/Passengerdetails";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

// Get screen dimensions
const { width, height } = Dimensions.get("window");
const passengerdetails = () => {
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const { travelInfo, flightSearchInfo, flightBookingPrice } = useFlightAppData(
    (state) => state
  );
  console.log(flightBookingPrice);
  const totalTravelers =
    travelInfo?.adults + travelInfo?.children + travelInfo?.infants;
  const departureDateObj = flightSearchInfo?.departDate
    ? new Date(flightSearchInfo?.departDate)
    : null;
  const formattedDepartureDate = departureDateObj
    ? departureDateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const togglePriceBreakup = () => {
    setShowPriceBreakup(!showPriceBreakup);
  };

  // Function to format date as "Month Day" (e.g., "September 25")
  let mainCount = 0;
  useEffect(() => {
    // Listen to theme changes
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    // Clean up the listener
    return () => subscription.remove();
  }, []);

  const returnPassengerFunc = (count: number, type: string) => {
    return Array.from({ length: count }).map((item, ind) => (
      <Passengerdetails key={ind} type={type} count={++mainCount} />
    ));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.passengerDetailscontainer}
        stickyHeaderIndices={[0]}
      >
        <View>
          <StatusBar
            barStyle={theme === "dark" ? "light-content" : "dark-content"}
            backgroundColor={theme === "dark" ? "#01493E" : "#FFFFFF"}
          />
          <View style={styles.passenger_header}>
            <View>
              <TouchableOpacity style={styles.arrow} onPress={router.back}>
                <FeatherIcon name="arrow-left" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.headerCenter}>
              {flightSearchInfo?.fromAirportData &&
              flightSearchInfo?.fromAirportData.IATA &&
              flightSearchInfo.fromAirportData.City &&
              flightSearchInfo.toAirportData &&
              flightSearchInfo.toAirportData.IATA &&
              flightSearchInfo.toAirportData.City ? (
                <>
                  <View style={styles.cityText}>
                    {/* <Text style={styles.headerFlightText}>
                      {flightSearchInfo.fromAirportData.IATA},
                    </Text> */}
                    <Text style={styles.headerFlightText}>
                      {flightSearchInfo.fromAirportData.City}
                    </Text>
                    <Text style={styles.arrow}>→</Text>
                    {/* <Text style={styles.headerFlightText}>
                      {flightSearchInfo.toAirportData.IATA},
                    </Text> */}
                    <Text style={styles.headerFlightText}>
                      {flightSearchInfo.toAirportData.City}
                    </Text>
                  </View>

                  {/* Details section below city and IATA, aligned horizontally */}
                  <View style={styles.detailsContainer}>
                    <Text style={styles.detail}>
                      {formattedDepartureDate} .
                    </Text>
                    <Text style={styles.detail}>
                      {totalTravelers} Travelers .
                    </Text>
                    <Text style={styles.detail}>{flightSearchInfo?.class}</Text>
                  </View>
                </>
              ) : (
                <Text style={styles.cityText}>
                  City Information Unavailable
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.passenger_list}>
          <View style={styles.passenger_cardcontainer}>
            {travelInfo?.adults > 0 &&
              returnPassengerFunc(travelInfo?.adults, "Adult")}
            {travelInfo?.infants > 0 &&
              returnPassengerFunc(travelInfo?.infants, "Infant")}

            {travelInfo?.children > 0 &&
              returnPassengerFunc(travelInfo?.children, "Child")}
          </View>
          <View style={styles.passenger_contactcontainer}>
            <View>
              <Text style={styles.contact_title}>Contact Information</Text>
              <Text style={styles.contact_subtext}>
                Booking details will be sent to this mobile number & email
                address
              </Text>
            </View>
            <View style={styles.contact_content}>
              <View>
                <View></View>
                <View>
                  <TextInput
                    underlineColor="transparent"
                    activeUnderlineColor="gray"
                    placeholder="Contact No"
                    style={styles.inputfields}
                  />
                </View>
              </View>
              <View>
                <TextInput
                  underlineColor="transparent"
                  activeUnderlineColor="gray"
                  style={styles.inputfields}
                  placeholder="Email ID"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* {bottom modal} */}
      <View style={styles.bottomModal}>
        <View style={styles.modalContent}>
          <View style={styles.leftColumn}>
            {/* Display the price only if both flights are selected in roundtrip or just the departure in one-way */}
            <Text style={styles.ModalpriceText}>
              ₹{flightBookingPrice?.totalFare?.toFixed(2)}
            </Text>

            {/* View Breakup */}
            <TouchableOpacity onPress={togglePriceBreakup}>
              <View style={styles.viewBreakupContainer}>
                <Text style={styles.viewBreakupText}>View Breakup</Text>
                <FeatherIcon
                  name={showPriceBreakup ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#000"
                />
              </View>
            </TouchableOpacity>

            {/* Price Breakup Details */}
            {showPriceBreakup && (
              <View style={styles.breakupDetails}>
                <View style={styles.breakupRow}>
                  <Text style={styles.breakupLabel}>Base Fare :</Text>
                </View>
                <View style={styles.breakupRow}>
                  <Text style={styles.breakupLabel}>Tax :</Text>
                </View>
                <View style={styles.breakupRow}>
                  <Text style={styles.breakupLabelTotal}>Total Amount :</Text>
                </View>
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            <TouchableOpacity
              onPress={() => {
                router.push("/(tabs)/(home)/addon");
              }}
              style={styles.continueButton}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

            {/* Price Breakup Below Continue Button */}
            {showPriceBreakup && (
              <View style={styles.pricebreakupDetails}>
                {/* Base Fare */}
                <View style={styles.pricebreakupRow}>
                  <Text style={styles.breakupAmount}>
                    ₹{flightBookingPrice?.baseFare?.toFixed(2)}
                  </Text>
                </View>

                {/* Tax */}
                <View style={styles.pricebreakupRow}>
                  <Text style={styles.breakupAmount}>
                    ₹{flightBookingPrice?.tax?.toFixed(2)}
                  </Text>
                </View>

                {/* Total */}
                <View style={styles.pricebreakupRow}>
                  <Text style={styles.breakupAmountTotal}>
                    ₹{flightBookingPrice?.totalFare?.toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  passengerDetailscontainer: {
    backgroundColor: "#f2f2f2",
  },
  passenger_header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingHorizontal: width * 0.05,
    alignItems: "center",
    gap: 20,

    paddingVertical: 10,
    shadowColor: "#000",
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        backgroundColor: "#f2f2f2",
      },
      android: {
        elevation: 5,
      },
    }),

    // Shadow for Android
  },
  headerCenter: {
    display: "flex",
    flex: 1,
  },
  cityText: {
    color: "black",
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginBottom: 3,
    alignItems: "center",
    flexDirection: "row",
  },
  arrow: {
    color: "black",
    fontSize: 24,
    marginHorizontal: 10,
  },
  detailsContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    flexWrap: "wrap",
  },
  detail: {
    opacity: 0.7,
    color: "black",
    fontSize: width * 0.03,
  },
  headerFlightText: {
    fontSize: 15,
    fontWeight: "700",
  },
  passenger_list: {
    marginHorizontal: 10,
    paddingBottom: 100,
  },
  passenger_cardcontainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  passenger_contactcontainer: {
    margin: 10,
    padding: 10,
  },

  contact_title: {
    fontSize: 20,
    fontWeight: "500",
  },
  contact_subtext: {
    color: "gray",
    marginTop: 5,
  },
  contact_content: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  inputfields: {
    borderWidth: 0,
    backgroundColor: "transparent",
    outline: "none",
    borderColor: "gray",
    borderBottomWidth: 0.5,
    fontSize: 15,
  },

  // bottom modal

  //BottoM Price View Break Up
  bottomModal: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    padding: width * 0.04, // Responsive padding based on screen width
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
  },

  modalContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  leftColumn: {
    flex: 1,
  },
  ModalpriceText: {
    fontSize: width * 0.05, // Responsive font size based on screen width
    fontWeight: "bold",
  },

  viewBreakupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height * 0.01, // Responsive margin top based on screen height
  },

  viewBreakupText: {
    color: "#000",
    opacity: 0.7,
    marginRight: width * 0.01, // Responsive marginRight based on screen width
  },

  breakupDetails: {
    marginTop: height * 0.01, // Responsive margin top based on screen height
  },
  pricebreakupRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: height * 0.005, // Responsive vertical spacing based on screen height
  },

  breakupRow: {
    marginVertical: height * 0.005, // Responsive vertical margin based on screen height
  },

  breakupLabel: {
    fontSize: width * 0.035, // Responsive font size based on screen width
  },
  breakupLabelTotal: {
    fontWeight: "bold",
    fontSize: width * 0.045,
  },
  breakupAmount: {
    fontSize: width * 0.035, // Responsive font size based on screen width
    color: "#000", // Customize the amount color
  },
  breakupAmountTotal: {
    fontWeight: "bold",
    fontSize: width * 0.045, // Responsive font size based on screen width
    color: "#000", // Customize the amount color
  },

  rightColumn: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    marginLeft: width * 0.05, // Responsive left margin based on screen width
  },

  continueButton: {
    backgroundColor: "#01493E",
    paddingVertical: height * 0.02, // Responsive vertical padding based on screen height
    paddingHorizontal: width * 0.12, // Responsive horizontal padding based on screen width
    borderRadius: 2,
    marginBottom: height * 0.01, // Responsive bottom margin based on screen height
  },

  continueText: {
    fontSize: width * 0.04, // Responsive font size based on screen width
    color: "#fff",
    fontWeight: "bold",
  },

  pricebreakupDetails: {
    marginTop: 0,
  },

  priceBreakupContainer: {
    marginTop: height * 0.02, // Responsive margin top based on screen height
    alignItems: "center", // Center the price details in the column
  },
});

export default passengerdetails;
