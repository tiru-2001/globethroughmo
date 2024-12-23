import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Seats from "@/components/seats/Seats";
import Foodcomponent from "@/components/Foodcomponent/Foodcomponent";
import Baggage from "@/components/Baggage/Baggage";
import { SafeAreaView } from "react-native-safe-area-context";
import { seatMealBagageNavItems } from "@/utilities";
import FeatherIcon from "react-native-vector-icons/Feather"; // For Feather Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFlightAppData } from "@/statemanagement/store";
import { ScrollView } from "react-native";
const { width, height } = Dimensions.get("window");

const currentPageFuc = (active: string) => {
  switch (active) {
    case "Seat":
      return <Seats />;
    case "Meal":
      return <Foodcomponent />;
    case "Baggage":
      return <Baggage />;
  }
};

const addon = () => {
  const {
    flightSearchInfo,
    travelInfo,
    addFlightSearchInfo,
    addFlightBookingPrice,
    flightBookingPrice,
  } = useFlightAppData((state) => state);
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  const [activeNavItem, setNavItem] = useState<string>("Seat");
  const totalPrice =
    flightSearchInfo?.tripType === "oneWay"
      ? flightSearchInfo?.departureFlight?.price
      : flightSearchInfo?.departureFlight?.price +
        flightSearchInfo?.returnFlight?.price;

  const taxRate = 0.2; // 20% tax
  const tax = totalPrice * taxRate;
  const totalPriceWithTax = totalPrice + tax;

  // Toggle price breakup visibility
  const togglePriceBreakup = () => {
    setShowPriceBreakup(!showPriceBreakup);
  };
  return (
    <SafeAreaView style={styles.flightListScreen}>
      <View style={styles.topnavbarMainContainer}>
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={router.back}>
            <FeatherIcon name="arrow-left" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.topnavbar}>
          {seatMealBagageNavItems.map((item, ind) => (
            <TouchableOpacity
              onPress={() => {
                setNavItem(item.title);
              }}
              key={ind}
              style={
                activeNavItem == item.title
                  ? styles.navItemActive
                  : styles.topNavbarItem
              }
            >
              <View
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={25}
                  color="#01493E"
                />
                <Text>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>{" "}
      {currentPageFuc(activeNavItem)}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flightListScreen: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  topnavbarMainContainer: {
    flexDirection: "column",
  },
  topnavbar: {
    flexDirection: "row",
    padding: 10,
    gap: 25,
  },

  arrowContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topNavbarItem: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 15,
    flex: 1,
    borderRadius: 5,
    borderWidth: 1,
  },
  topNavbarItemContainer: {
    width: "100%",
    borderColor: "orange",
  },
  navItemActive: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    paddingVertical: 15,
    flex: 1,
    borderRadius: 5,
  },

  //bottom breakup container

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
export default addon;
