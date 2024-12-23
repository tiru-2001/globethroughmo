import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { RadioButton, TextInput } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

const Passengerdetails = ({ type, count }: { type: string; count: number }) => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const handleData = (event: any, selectedDate?: Date): void => {
    setShowDate(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.passengerDetailsContainer}>
      <View>
        <Text style={styles.headerText}>
          Passenger {count}. {type}
        </Text>
      </View>
      <View style={styles.radioBtnContainer}>
        <View style={styles.radioBtnInnerContainer}>
          <Text>Male</Text>
          <RadioButton value="male" />
        </View>
        <View style={styles.radioBtnInnerContainer}>
          <Text>Female</Text>
          <RadioButton value="female" />
        </View>
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          underlineColor="transparent"
          activeUnderlineColor="gray"
          placeholderTextColor={"gray"}
          style={styles.inputFields}
          placeholder="First name"
        />
        <TextInput
          underlineColor="transparent"
          activeUnderlineColor="gray"
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

export default Passengerdetails;

// });
const styles = StyleSheet.create({
  passengerDetailsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    margin: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Shadow for Android
    elevation: 2,
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
    gap: 10,
  },
  inputFields: {
    padding: 0,
    borderWidth: 0,
    borderBottomWidth: 0.5,
    backgroundColor: "transparent",
    borderColor: "gray",
    outline: "none",
    fontSize: 15,
  },
  dateContainer: {
    borderColor: "gray",
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
    position: "absolute",
    zIndex: 9,
    cursor: "pointer",
  },
});
