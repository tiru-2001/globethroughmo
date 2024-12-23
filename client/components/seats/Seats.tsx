import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { seatData } from "@/utilities";

const Seats = () => {
  return (
    <>
      <ScrollView style={styles.bottom}>
        <View style={styles.frontView}></View>
        <View style={styles.seatsContainer}>
          <View style={styles.left}>
            {seatData[0].left?.map((item, ind) => {
              if (ind == 0) {
                return (
                  <View key={ind} style={styles.individualSeats}>
                    <Text>{item.col1}</Text>
                    <Text>{item.col2}</Text>
                    <Text>{item.col3}</Text>
                  </View>
                );
              } else {
                return (
                  <View key={ind} style={styles.individualSeats}>
                    <View style={styles.seat}></View>
                    <View style={styles.seat}></View>
                    <View style={styles.seat}></View>
                  </View>
                );
              }
            })}
          </View>
          {/* <View style={styles.middle}>
            {seatData[1].middle?.map((item, ind) => {
              if (ind == 0) {
                return (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                );
              } else {
                return (
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>{item}</Text>
                  </View>
                );
              }
            })}
          </View> */}
          <View style={styles.right}>
            {seatData[2].right?.map((item, ind) => {
              if (ind == 0) {
                return (
                  <View key={ind} style={styles.individualSeats}>
                    <Text>{item.col1}</Text>
                    <Text>{item.col2}</Text>
                    <Text>{item.col3}</Text>
                  </View>
                );
              } else {
                return (
                  <View key={ind} style={styles.individualSeats}>
                    <Text style={styles.seat}></Text>
                    <Text style={styles.seat}></Text>
                    <Text style={styles.seat}></Text>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Seats;

const styles = StyleSheet.create({
  flightScreenContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    flex: 1,
  },
  topNavbar: {
    height: 60,
  },
  top: {
    height: 100,
  },
  bottom: {
    marginHorizontal: 30,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    paddingHorizontal: 10,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingBottom: 110,
  },
  frontView: {
    borderColor: "gray",
    height: 150,
  },
  seatsContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  left: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  middle: {
    display: "flex",
    flexDirection: "column",
    gap: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  right: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  individualSeats: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },
  seat: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: "#D3D3D3",
    cursor: "pointer",
  },
});
