import React, { useState, useEffect, useRef } from "react";
import Icon from "react-native-vector-icons/Feather";
import styles from "@/app/(tabs)/(home)/homestyles";
import { AntDesign } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Animated,
  Dimensions,
  Easing,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { RadioButton } from "react-native-paper";
import CustomCalendar from "../customcalendar/customCalendar";
import { Airport, AirportData, FlightClass } from "@/types";
import airportData from "@/utilities/airport.json";
import { useFlightAppData } from "@/statemanagement/store";
import { router } from "expo-router";

const FlightBookingComponent = () => {
  const { flightSearchInfo, addFlightSearchInfo, travelInfo, addTravelInfo } =
    useFlightAppData((state) => state);
  const [filteredAirports, setFilteredAirports] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelectingDeparture, setIsSelectingDeparture] = useState(true);
  const [showAirportModal, setShowAirportModal] = useState(false);
  const [selectedAirportType, setSelectedAirportType] = useState<"from" | "to">(
    "from"
  );
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [departureDate, setDepartureDate] = useState<any | null>(null);
  const [returnDate, setReturnDate] = useState<any | null>(null);
  const [isTravelerModalVisible, setTravelerModalVisible] = useState(false);
  const [isClassModalVisible, setClassModalVisible] = useState(false);
  const [defaultAirportsCount] = useState(10);
  const [showMoreAirports, setShowMoreAirports] = useState(false);
  const [fromAirport, setFromAirport] = useState<string | undefined>(
    "Select Airport"
  );
  const [toAirport, setToAirport] = useState<string | undefined>(
    "Select Airport"
  );
  const [fromAirportData, setFromAirportData] = useState<AirportData | null>(
    null
  );
  const [tripType, setTripType] = useState<"oneWay" | "roundWay">("oneWay");
  const [selectedClass, setClass] = useState<FlightClass | string>("");
  const [adults, setAdults] = useState<number>(0);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<
    "Student" | "Senior Citizen" | "Armed Force" | null | string
  >(null);
  const [toAirportData, setToAirportData] = useState<AirportData | null>(null);
  const displayedAirports = showMoreAirports
    ? filteredAirports
    : filteredAirports.slice(0, defaultAirportsCount);

  //for responive
  const { width, height } = Dimensions.get("window");

  //for travelller popup
  const handleTravelerModalToggle = () => {
    setTravelerModalVisible(!isTravelerModalVisible);
  };
  //for class popup
  const handleClassModalToggle = () => {
    setClassModalVisible(!isClassModalVisible);
  };

  // for plus button inside traveller popup
  const handleIncrement = (type: "adults" | "children" | "infants") => {
    if (type === "adults") {
      setAdults(adults + 1);
      setIsAdultsValid(adults + 1 > 0);
    } else if (type === "children") {
      setChildren(children + 1);
    } else if (type === "infants") {
      setInfants(infants + 1);
    }
  };

  const handleDecrement = (type: "adults" | "children" | "infants") => {
    if (type === "adults" && adults > 0) {
      setAdults(adults - 1);
    } else if (type === "children" && children > 0) {
      setChildren(children - 1);
    } else if (type === "infants" && infants > 0) {
      setInfants(infants - 1);
    }
  };

  // Flight search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAirports([]); // Clear airports if search query is empty
      return;
    }

    // Filter airports from the imported JSON data
    const filtered = airportData.filter((airport: Airport) => {
      // Explicitly type airport as Airport
      const searchLower = searchQuery.toLowerCase();
      // Only include airports where IATA is not "\\N"
      if (airport.IATA === "\\N") {
        return false; // Skip this airport
      }
      return (
        airport.Name.toLowerCase().includes(searchLower) ||
        airport.City.toLowerCase().includes(searchLower) ||
        airport.Country.toLowerCase().includes(searchLower) ||
        airport.IATA.toLowerCase().includes(searchLower) ||
        airport.ICAO.toLowerCase().includes(searchLower)
      );
    });

    setFilteredAirports(filtered);
  }, [searchQuery]);

  // Handle airport selection and dispatch actions to Redux
  // Handle airport selection
  const handleAirportSelect = (airport: {
    Name: string;
    IATA: string;
    City: string;
  }): void => {
    if (selectedAirportType === "from") {
      setFromAirport(airport.Name); // Store only the airport name

      setFromAirportData({
        Name: airport.Name,
        IATA: airport.IATA,
        City: airport.City,
      });

      setIsFromAirportValid(airport.Name !== "Select Airport");
    } else if (selectedAirportType === "to") {
      setToAirport(airport.Name); // Store only the airport name

      setToAirportData({
        Name: airport.Name,
        IATA: airport.IATA,
        City: airport.City,
      });

      setIsToAirportValid(airport.Name !== "Select Airport");
    }
    setShowAirportModal(false);
    setSearchQuery(""); // Clear search query
  };

  const today = new Date().toISOString().split("T")[0]; // Today's date in 'YYYY-MM-DD' format
  const minReturnDate = departureDate
    ? departureDate.toISOString().split("T")[0]
    : today;

  const formatDate = (date: Date | null): string => {
    if (!date) {
      date = new Date(); // If date is null, set it to today's date
    }
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDayPress = (day: { dateString: string }) => {
    const selectedDate = new Date(day.dateString); // Convert to Date object

    if (isSelectingDeparture) {
      // Dispatch selected date as Date object
      setDepartureDate(selectedDate);

      if (!returnDate) {
        // If return date is not selected, set it as the departure date
        setReturnDate(selectedDate);
      } else if (selectedDate > new Date(returnDate)) {
        // If the return date is earlier than the selected departure date, reset return date
        setReturnDate(selectedDate);
      }
    } else {
      // Validate that return date is after departure date
      const departureDateObj = new Date(departureDate);
      if (selectedDate >= departureDateObj) {
        setReturnDate(selectedDate); // Dispatch return date as Date object
      } else {
        alert("Return date must be after the departure date.");
      }
    }

    // Close the calendar popup
    setCalendarVisible(false);
  };

  // Trip type change handler (One way or Round trip)
  const handleTripTypeChange = (type: "oneWay" | "roundWay") => {
    setTripType(type);
  };

  // Handle date selection popup toggle
  const handleDateSelection = (isDeparture: boolean) => {
    if (tripType === "oneWay" && !isDeparture) {
      alert("Return date is only applicable for Round Trip.");
      return;
    }
    setIsSelectingDeparture(isDeparture);
    setCalendarVisible(true);
  };

  // Modal toggle for class selection
  const handleClassSelection = (cls: string) => {
    setClass(cls);
    setClassModalVisible(false);
    setIsClassValid(cls !== "");
  };

  // Function to handle button press and set selected option
  const handleOptionSelect = (option: string) => {
    setSelectedOption(selectedOption === option ? null : option);
  };

  //Animation functions
  const slideAnim = useRef(new Animated.Value(height)).current; // Start off-screen at the bottom
  const heightAnim = useRef(new Animated.Value(0.1)).current; // Start with minimum height
  const borderRadiusAnim = useRef(new Animated.Value(0)).current; // Start with 0 radius

  // Trigger the animations only when isLoading becomes false
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0, // Slide up to on-screen position
        duration: 500,
        useNativeDriver: true,
        easing: Easing.ease, // Ease the animation for smoothness
      }),
      Animated.timing(heightAnim, {
        toValue: 1, // Animate to final height (55%)
        duration: 500,
        useNativeDriver: false,
        easing: Easing.ease, // Ease the animation for smoothness
      }),
      Animated.timing(borderRadiusAnim, {
        toValue: 20, // Animate border radius to 20
        duration: 500,
        useNativeDriver: false,
        easing: Easing.ease, // Ease the animation for smoothness
      }),
    ]).start();
  }, []); // Run this effect only when isLoading changes
  //validation for selection of user fields
  const [isFromAirportValid, setIsFromAirportValid] = useState(true);
  const [isToAirportValid, setIsToAirportValid] = useState(true);
  const [isAdultsValid, setIsAdultsValid] = useState(true);
  const [isClassValid, setIsClassValid] = useState(true);
  // Validation and final submission
  const handlePress = () => {
    // Check if from and to airports are selected
    const isFromAirportSelected = fromAirport !== "Select Airport";
    const isToAirportSelected = toAirport !== "Select Airport";

    // Check if adults count is valid (greater than 0)
    const isAdultsValid = adults > 0;

    // Check if class is selected
    const isClassSelected = selectedClass !== "";

    // Set validation states
    setIsFromAirportValid(isFromAirportSelected);
    setIsToAirportValid(isToAirportSelected);
    setIsAdultsValid(isAdultsValid);
    setIsClassValid(isClassSelected);

    // If any validation fails, prevent proceeding
    if (
      !isFromAirportSelected ||
      !isToAirportSelected ||
      !isAdultsValid ||
      !isClassSelected
    ) {
      return; // Prevent further actions if any validation fails
    }
    addFlightSearchInfo({
      tripType: tripType,
      departDate: departureDate
        ? departureDate.toISOString()
        : new Date().toISOString(),
      returnDate: returnDate ? returnDate.toISOString() : null,
      fromLocation: fromAirport,
      toLocation: toAirport,
      class: selectedClass,
      fromAirportData: {
        IATA: fromAirportData?.IATA,
        City: fromAirportData?.City,
        Name: fromAirportData?.Name,
      },
      toAirportData: {
        IATA: toAirportData?.IATA,
        City: toAirportData?.City,
        Name: toAirportData?.Name,
      },
    });
    addTravelInfo({
      adults: adults,
      infants: infants,
      children: children,
      selectedOption: selectedOption,
    });
    console.log(flightSearchInfo);
    console.log(travelInfo);
    router.push("/(tabs)/(home)/flightResult");
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bodyCard, { transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.tripOptions}>
          <Pressable
            style={[
              styles.tripButton,
              tripType === "oneWay" && styles.selectedTripButton,
            ]}
            onPress={() => handleTripTypeChange("oneWay")}
          >
            <Text style={styles.tripButtonText}>One Way</Text>
          </Pressable>
          <Pressable
            style={[
              styles.tripButton,
              tripType === "roundWay" && styles.selectedTripButton,
            ]}
            onPress={() => handleTripTypeChange("roundWay")}
          >
            <Text style={styles.tripButtonText}>Round Way</Text>
          </Pressable>
        </View>

        <View style={styles.dateRow}>
          {/* Departure Date Container */}
          <View style={styles.dateContainer}>
            <Text style={styles.floatingLabel}>Departure Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => handleDateSelection(true)}
            >
              <View>
                <Icon
                  name="calendar"
                  size={15}
                  color="#888"
                  style={{ marginRight: 8 }}
                />
              </View>
              <Text style={styles.dateText}>{`${formatDate(
                departureDate
              )}`}</Text>
            </TouchableOpacity>
          </View>

          {/* Return Date Container */}
          <View style={styles.dateContainer}>
            <Text style={styles.floatingLabel}>Return Date</Text>
            <TouchableOpacity
              style={[
                styles.dateInput,
                tripType === "oneWay" && styles.disabledDateInput, // Apply disabled style when tripType is "oneWay"
              ]}
              onPress={() => handleDateSelection(false)} // Open the return date calendar for round trips
            >
              <View>
                <Icon
                  name="calendar"
                  size={15}
                  color={tripType === "oneWay" ? "#d3d3d3" : "#888"} // Change icon color based on trip type
                  style={{ marginRight: 8 }}
                />
              </View>
              <Text style={styles.dateText}>{`${formatDate(returnDate)}`}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {calendarVisible && (
          <CustomCalendar
            visible={calendarVisible}
            flightPrices={{
              "2024-11-20": 120,
              "2024-11-21": 150,
              "2024-11-22": 180,
            }}
            minDate={isSelectingDeparture ? today : minReturnDate} // Min date logic for departure and return
            onDayPress={handleDayPress}
            onClose={() => setCalendarVisible(false)}
          />
        )}

        <Modal
          transparent={true}
          visible={showAirportModal}
          animationType="slide"
        >
          {/* Dismiss keyboard on touch outside */}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Airport</Text>

                {/* Search Input */}
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Airports"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />

                {/* Airport List */}
                <ScrollView
                  style={styles.airportList}
                  keyboardShouldPersistTaps="handled" // Ensure touches are registered even with the keyboard open
                >
                  {displayedAirports.length > 0 ? (
                    displayedAirports.map((airport, index) => (
                      <TouchableOpacity
                        key={`${airport.IATA}-${index}`}
                        style={styles.airportItem}
                        onPress={() => {
                          handleAirportSelect(airport); // Pass the full airport object
                          Keyboard.dismiss(); // Optionally dismiss the keyboard
                        }}
                      >
                        <Text>
                          {airport.Name} ({airport.IATA})
                        </Text>
                        <Text>
                          {airport.City}, {airport.Country}
                        </Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.noResultsText}>No airports found</Text>
                  )}
                </ScrollView>

                {/* Cancel Button */}
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowAirportModal(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.locationCards}>
          {/* From Card */}
          <TouchableOpacity
            style={[
              styles.fromCard,
              !isFromAirportValid && {
                borderColor: "#C5012D",
                borderWidth: 1,
              },
            ]}
            onPress={() => {
              setSelectedAirportType("from");
              setShowAirportModal(true);
            }}
          >
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>From</Text>
              {!isFromAirportValid && (
                <AntDesign
                  name="exclamationcircleo"
                  style={styles.warning_icon}
                />
              )}
            </View>
            <Text
              style={styles.cardAirport}
              numberOfLines={1} // Restrict to a single line
              ellipsizeMode="tail" // Add "..." at the end if text is truncated
            >
              {fromAirport}
            </Text>
          </TouchableOpacity>

          {/* Icon Between Cards */}
          <Image
            source={require("../../assets/images/Route_icon.png")}
            style={styles.overlapIcon}
          />

          {/* To Card */}
          <TouchableOpacity
            style={[
              styles.toCard,
              !isToAirportValid && { borderColor: "#C5012D", borderWidth: 1 },
            ]}
            onPress={() => {
              setSelectedAirportType("to");
              setShowAirportModal(true);
            }}
          >
            <View style={styles.cardRow}>
              <Text style={styles.cardTitle}>To</Text>
              {!isToAirportValid && (
                <AntDesign
                  name="exclamationcircleo"
                  style={styles.warning_icon}
                />
              )}
            </View>
            <Text
              style={styles.cardAirport}
              numberOfLines={1} // Restrict to a single line
              ellipsizeMode="tail" // Add "..." at the end if text is truncated
            >
              {toAirport}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passengerClassContainer}>
          <View style={styles.passengerRow}>
            <TouchableOpacity
              style={[
                styles.passengerCard,
                !isAdultsValid && { borderColor: "#C5012D", borderWidth: 1 }, // Red border if invalid
              ]}
              onPress={handleTravelerModalToggle}
            >
              <Text style={styles.passengerLabel}>
                Travelers{" "}
                {!isAdultsValid && (
                  <AntDesign
                    name="exclamationcircleo"
                    size={10}
                    color="#C5012D"
                  />
                )}
              </Text>

              <Text style={styles.passengerCount}>
                Ad, {adults} Ch, {children} In {infants}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.classCard,
                !isClassValid && { borderColor: "#C5012D", borderWidth: 1 }, // Red border if invalid
              ]}
              onPress={handleClassModalToggle}
            >
              <Text style={styles.classLabel}>
                Class{" "}
                {!isClassValid && (
                  <AntDesign
                    name="exclamationcircleo"
                    size={10}
                    color="#C5012D"
                  />
                )}
              </Text>
              <Text style={styles.classSelection}>
                {selectedClass || "Select Class"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Traveler Modal */}
          <Modal
            visible={isTravelerModalVisible}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.travelerModalContainer}>
                {/* Close Arrow at the Top */}
                <TouchableOpacity
                  style={styles.closeArrowContainer}
                  onPress={handleTravelerModalToggle}
                >
                  <Icon
                    name="arrow-left"
                    size={30}
                    color="#000"
                    style={styles.closeArrowImage}
                  />
                </TouchableOpacity>
                <Text style={styles.travelerModalTitle}>Select Travelers</Text>

                {/* Adults Counter */}
                <View style={styles.travelerOptionContainer}>
                  <View>
                    <Text style={styles.travelerOptionText}>Adults</Text>
                    <Text style={styles.ageDescription}>12+ Years</Text>
                  </View>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleDecrement("adults")}
                    >
                      <Text style={styles.minusButton}>—</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{adults}</Text>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleIncrement("adults")}
                    >
                      <Text style={styles.minusButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Children Counter */}
                <View style={styles.travelerOptionContainer}>
                  <View>
                    <Text style={styles.travelerOptionText}>Children</Text>
                    <Text style={styles.ageDescription}>2-12 Years</Text>
                  </View>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleDecrement("children")}
                    >
                      <Text style={styles.minusButton}>—</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{children}</Text>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleIncrement("children")}
                    >
                      <Text style={styles.minusButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Infants Counter */}
                <View style={styles.travelerOptionContainer}>
                  <View>
                    <Text style={styles.travelerOptionText}>Infants</Text>
                    <Text style={styles.ageDescription}>Below 2 Years</Text>
                  </View>
                  <View style={styles.counterContainer}>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleDecrement("infants")}
                    >
                      <Text style={styles.minusButton}>—</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{infants}</Text>
                    <TouchableOpacity
                      style={styles.circleButton}
                      onPress={() => handleIncrement("infants")}
                    >
                      <Text style={styles.minusButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleTravelerModalToggle}
                >
                  <Text style={styles.closeButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Class Modal */}
          <Modal
            visible={isClassModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClassModalToggle} // Close modal on Android back press
          >
            <View style={styles.modalOverlay1}>
              <View style={styles.modalContent1}>
                <Text style={styles.modalTitle1}>Select Class</Text>
                {["economy", "business", "first"].map((cls) => (
                  <TouchableOpacity
                    key={cls}
                    onPress={() => handleClassSelection(cls)} // Set class when an option is selected
                    style={styles.modalOption1}
                  >
                    {/* RadioButton for each class */}
                    <RadioButton
                      value={cls}
                      status={selectedClass === cls ? "checked" : "unchecked"} // Check if this option is selected
                      onPress={() => handleClassSelection(cls)}
                      color="#0B3E36" // Handle radio button press
                    />
                    <Text style={styles.classOption1}>{cls}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
        </View>

        <View>
          {/* Heading */}
          <Text style={styles.heading}>Special Fare Options</Text>

          {/* Fare Option Buttons / Cards */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "Student" && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect("Student")}
            >
              <Text style={styles.optionText}>Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "Senior Citizen" && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect("Senior Citizen")}
            >
              <Text style={styles.optionText}>Senior Citizen</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionCard,
                selectedOption === "Armed Force" && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect("Armed Force ")}
            >
              <Text style={styles.optionText}>Armed Force</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Search Flights</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default FlightBookingComponent;
