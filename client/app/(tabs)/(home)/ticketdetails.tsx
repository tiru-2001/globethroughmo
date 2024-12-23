import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./ticketdetailstyles";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useFlightAppData } from "@/statemanagement/store";
import { router } from "expo-router";

const TicketDetailScreen = () => {
  const { flightSearchInfo } = useFlightAppData((state) => state);
  console.log(flightSearchInfo);
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  const formatTime = (time: string, is12Hour: boolean) => {
    const date = new Date(time);
    return is12Hour
      ? date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
  };

  const formatDate = (date: string | any) => {
    const d = new Date(date);
    return `${d.toLocaleString("en-US", {
      weekday: "short",
    })}, ${d.toLocaleString("en-US", {
      month: "short",
    })} ${d.getDate()}, ${formatTime(date, false)}`;
  };

  const handleShare = () => {
    // Logic for sharing, can be implemented as needed
  };

  // Calculate total price based on the trip type
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

  const renderOneWayTicket = () => {
    return (
      <View style={styles.oneWayCard}>
        {/* Departure Ticket Content for One-Way */}
        <View style={styles.row1}>
          <View style={styles.left}>
            <Image
              source={flightSearchInfo?.departureFlight.flightLogo}
              style={styles.flightLogoLarge}
              resizeMode="contain"
            />
            <Text style={styles.flightNumber}>
              {flightSearchInfo?.departureFlight.flightNumber}
            </Text>
          </View>
          <View style={styles.right}>
            <Text style={styles.selectedClass}>{flightSearchInfo?.class}</Text>
          </View>
        </View>

        {/* Departure Time */}
        <View style={styles.row2}>
          <View style={styles.StarttimeColumn}>
            <Text>
              <Text style={styles.Start_end_time24}>
                {formatTime(flightSearchInfo?.departureFlight.startTime, false)}{" "}
              </Text>
              <Text style={styles.start_end_time12}>
                ({formatTime(flightSearchInfo?.departureFlight.startTime, true)}
                )
              </Text>
            </Text>
          </View>
          <View style={styles.endtimeColumn}>
            <Text>
              <Text style={styles.Start_end_time24}>
                {formatTime(flightSearchInfo?.departureFlight.endTime, false)}{" "}
              </Text>
              <Text style={styles.start_end_time12}>
                ({formatTime(flightSearchInfo?.departureFlight.endTime, true)})
              </Text>
            </Text>
          </View>
        </View>

        {/* From Airport, Duration, Stops, and To Airport */}
        <View style={styles.row3}>
          <View style={styles.column}>
            <Text style={styles.boldText}>
              {flightSearchInfo?.fromAirportData?.IATA} -{" "}
              {flightSearchInfo?.fromAirportData?.City}
            </Text>
            <Text style={styles.fromAirportName}>
              {flightSearchInfo?.fromAirportData?.Name}
            </Text>
            {/* <Text style={styles.fromAirportName}>
              Terminal {flightSearchInfo?.fromAirportData?.Terminal}
            </Text> */}
          </View>

          {/* Flight Duration and Stops */}
          <View style={[styles.column, styles.center]}>
            <Text style={styles.departure_duration}>
              {flightSearchInfo?.departureFlight.duration} hrs
            </Text>
            <Svg width="49" height="8" viewBox="0 0 49 8" fill="none">
              <Path
                d="M48.8536 4.35355C49.0488 4.15829 49.0488 3.84171 48.8536 3.64645L45.6716 0.464466C45.4763 0.269204 45.1597 0.269204 44.9645 0.464466C44.7692 0.659728 44.7692 0.976311 44.9645 1.17157L47.7929 4L44.9645 6.82843C44.7692 7.02369 44.7692 7.34027 44.9645 7.53553C45.1597 7.7308 45.4763 7.7308 45.6716 7.53553L48.8536 4.35355ZM0.5 4.5H48.5V3.5H0.5V4.5Z"
                fill="#131313"
              />
            </Svg>
            <Text style={styles.departure_stops}>
              {flightSearchInfo?.departureFlight.stops} Stops
            </Text>
          </View>

          {/* To Airport */}
          <View style={styles.column}>
            <Text style={styles.boldText}>
              {flightSearchInfo?.toAirportData?.IATA} -{" "}
              {flightSearchInfo?.toAirportData?.City}
            </Text>
            <Text style={styles.fromAirportName}>
              {flightSearchInfo?.toAirportData?.Name}
            </Text>
            {/* <Text style={styles.fromAirportName}>
              Terminal {toAirport.Terminal}
            </Text> */}
          </View>
        </View>

        {/* Departure Date */}
        <View style={styles.row4}>
          <Text style={styles.departuredate_text}>Departure Date</Text>
          <Text style={styles.departureDate}>
            {formatDate(flightSearchInfo?.departDate)}
          </Text>
        </View>

        {/* Right Vertical Green Bar */}
        <View style={styles.rightBar}></View>
      </View>
    );
  };

  // for Round Trip Rendering Tickets
  const renderRoundTripTicket = () => {
    return (
      <View>
        <View style={styles.roundTripCard}>
          {/* Round-Trip Ticket Content (Departure + Return) */}

          {/* Departure Ticket */}
          <View style={styles.row1RoundTrip}>
            <View style={styles.left}>
              <Image
                source={flightSearchInfo?.departureFlight.flightLogo}
                style={styles.flightLogoLargeRoundTrip}
                resizeMode="contain"
              />
              <Text style={styles.flightNumberRoundTrip}>
                {flightSearchInfo?.departureFlight.flightNumber}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.selectedClassRoundTrip}>
                {flightSearchInfo?.class}
              </Text>
            </View>
          </View>

          {/* Departure Time */}
          <View style={styles.row2RoundTrip}>
            <View style={styles.StarttimeColumnRoundTrip}>
              <Text>
                <Text style={styles.Start_end_time24RoundTrip}>
                  {formatTime(
                    flightSearchInfo?.departureFlight.startTime,
                    false
                  )}{" "}
                </Text>
                <Text style={styles.start_end_time12RoundTrip}>
                  (
                  {formatTime(
                    flightSearchInfo?.departureFlight.startTime,
                    true
                  )}
                  )
                </Text>
              </Text>
            </View>
            <View style={styles.endtimeColumnRoundTrip}>
              <Text>
                <Text style={styles.Start_end_time24RoundTrip}>
                  {formatTime(flightSearchInfo?.departureFlight.endTime, false)}{" "}
                </Text>
                <Text style={styles.start_end_time12RoundTrip}>
                  ({formatTime(flightSearchInfo?.departureFlight.endTime, true)}
                  )
                </Text>
              </Text>
            </View>
          </View>

          {/* From Airport, Duration, Stops, and To Airport */}
          <View style={styles.row3RoundTrip}>
            <View style={styles.columnRoundTrip}>
              <View style={styles.iata_cityRowRoundTrip}>
                <Text style={styles.iataTextRoundTrip}>
                  {flightSearchInfo?.fromAirportData?.IATA},
                </Text>
                <Text style={styles.cityTextRoundTrip}>
                  {flightSearchInfo?.fromAirportData?.City}
                </Text>
              </View>
              <Text style={styles.fromAirportNameRoundTrip}>
                {flightSearchInfo?.fromAirportData?.Name}
              </Text>
              {/* <Text style={styles.fromAirportNameRoundTrip}>
                Terminal {flightSearchInfo?.fromAirportData?.Terminal}
              </Text> */}
            </View>

            {/* Flight Duration and Stops */}
            <View style={[styles.columnRoundTrip, styles.centerRoundTrip]}>
              <Text style={styles.departure_durationRoundTrip}>
                {flightSearchInfo?.departureFlight.duration} hrs
              </Text>
              <Svg width="49" height="8" viewBox="0 0 49 8" fill="none">
                <Path
                  d="M48.8536 4.35355C49.0488 4.15829 49.0488 3.84171 48.8536 3.64645L45.6716 0.464466C45.4763 0.269204 45.1597 0.269204 44.9645 0.464466C44.7692 0.659728 44.7692 0.976311 44.9645 1.17157L47.7929 4L44.9645 6.82843C44.7692 7.02369 44.7692 7.34027 44.9645 7.53553C45.1597 7.7308 45.4763 7.7308 45.6716 7.53553L48.8536 4.35355ZM0.5 4.5H48.5V3.5H0.5V4.5Z"
                  fill="#131313"
                />
              </Svg>
              <Text style={styles.departure_stopsRoundTrip}>
                {flightSearchInfo?.departureFlight.stopsRoundTrip} Stops
              </Text>
            </View>

            {/* To Airport */}
            <View style={styles.columnRoundTrip}>
              <View style={styles.iata_cityRowRoundTrip}>
                <Text style={styles.iataTextRoundTrip}>
                  {flightSearchInfo?.toAirportData?.IATA},
                </Text>
                <Text style={styles.cityTextRoundTrip}>
                  {flightSearchInfo?.toAirportData?.City}
                </Text>
              </View>
              <Text style={styles.fromAirportNameRoundTrip}>
                {flightSearchInfo?.toAirportData?.Name}
              </Text>
              {/* <Text style={styles.fromAirportNameRoundTrip}>
                Terminal {toAirport.Terminal}
              </Text> */}
            </View>
          </View>

          {/* Return Date */}
          <View style={styles.row4RoundTrip}>
            <Text style={styles.departureDateRoundTrip}>
              {formatDate(flightSearchInfo?.departDate)}{" "}
              <Text style={styles.departuredate_textRoundTrip}>
                (Departure)
              </Text>
            </Text>
          </View>

          {/* Right Vertical Green Bar */}
          <View style={styles.rightBarRoundTrip}></View>
        </View>

        {/* Return Ticket */}
        <View style={styles.returnroundTripCard}>
          <View style={styles.row1RoundTrip}>
            <View style={styles.leftRoundTrip}>
              <Image
                source={flightSearchInfo?.returnFlight.flightLogo}
                style={styles.flightLogoLargeRoundTrip}
                resizeMode="contain"
              />
              <Text style={styles.flightNumberRoundTrip}>
                {flightSearchInfo?.returnFlight.flightNumber}
              </Text>
            </View>
            <View style={styles.rightRoundTrip}>
              <Text style={styles.selectedClassRoundTrip}>
                {flightSearchInfo?.class}
              </Text>
            </View>
          </View>

          {/* Departure Time */}
          <View style={styles.row2RoundTrip}>
            <View style={styles.StarttimeColumnRoundTrip}>
              <Text>
                <Text style={styles.Start_end_time24RoundTrip}>
                  {formatTime(flightSearchInfo?.returnFlight.startTime, false)}{" "}
                </Text>
                <Text style={styles.start_end_time12RoundTrip}>
                  ({formatTime(flightSearchInfo?.returnFlight.startTime, true)})
                </Text>
              </Text>
            </View>
            <View style={styles.endtimeColumnRoundTrip}>
              <Text>
                <Text style={styles.Start_end_time24RoundTrip}>
                  {formatTime(flightSearchInfo?.returnFlight.endTime, false)}{" "}
                </Text>
                <Text style={styles.start_end_time12RoundTrip}>
                  ({formatTime(flightSearchInfo?.returnFlight.endTime, true)})
                </Text>
              </Text>
            </View>
          </View>

          {/* From Airport, Duration, Stops, and To Airport */}
          <View style={styles.row3RoundTrip}>
            <View style={styles.columnRoundTrip}>
              <View style={styles.iata_cityRowRoundTrip}>
                <Text style={styles.iataTextRoundTrip}>
                  {flightSearchInfo?.fromAirportData?.IATA},
                </Text>
                <Text style={styles.cityTextRoundTrip}>
                  {flightSearchInfo?.fromAirportData?.City}
                </Text>
              </View>

              <Text style={styles.fromAirportNameRoundTrip}>
                {flightSearchInfo?.fromAirportData?.Name}
              </Text>
              {/* <Text style={styles.fromAirportNameRoundTrip}>
                Terminal {flightSearchInfo?.fromAirport.Terminal}
              </Text> */}
            </View>

            {/* Flight Duration and Stops */}
            <View style={[styles.columnRoundTrip, styles.centerRoundTrip]}>
              <Text style={styles.departure_durationRoundTrip}>
                {flightSearchInfo?.returnFlight.duration} hrs
              </Text>
              <Svg
                width="49"
                height="8"
                viewBox="0 0 49 8"
                fill="none"
                style={{ transform: [{ rotate: "180deg" }] }}
              >
                <Path
                  d="M48.8536 4.35355C49.0488 4.15829 49.0488 3.84171 48.8536 3.64645L45.6716 0.464466C45.4763 0.269204 45.1597 0.269204 44.9645 0.464466C44.7692 0.659728 44.7692 0.976311 44.9645 1.17157L47.7929 4L44.9645 6.82843C44.7692 7.02369 44.7692 7.34027 44.9645 7.53553C45.1597 7.7308 45.4763 7.7308 45.6716 7.53553L48.8536 4.35355ZM0.5 4.5H48.5V3.5H0.5V4.5Z"
                  fill="#131313"
                />
              </Svg>

              <Text style={styles.departure_stopsRoundTrip}>
                {flightSearchInfo?.returnFlight?.stops} Stops
              </Text>
            </View>

            {/* To Airport */}

            <View style={styles.columnRoundTrip}>
              <View style={styles.iata_cityRowRoundTrip}>
                <Text style={styles.iataTextRoundTrip}>
                  {flightSearchInfo?.toAirportData?.IATA},
                </Text>
                <Text style={styles.cityTextRoundTrip}>
                  {flightSearchInfo?.toAirportData?.City}
                </Text>
              </View>
              <Text style={styles.fromAirportNameRoundTrip}>
                {flightSearchInfo?.toAirportData?.Name}
              </Text>
              {/* <Text style={styles.fromAirportNameRoundTrip}>
                Terminal {flightSearchInfo?.toAirportData?.Terminal}
              </Text> */}
            </View>
          </View>

          {/* Return Date */}
          <View style={styles.row4RoundTrip}>
            <Text style={styles.departureDateRoundTrip}>
              {formatDate(flightSearchInfo?.returnDate)}{" "}
              <Text style={styles.departuredate_textRoundTrip}>(Return)</Text>
            </Text>
          </View>

          {/* Right Vertical Green Bar */}
          <View style={styles.rightBarRoundTrip}></View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <View style={styles.header}>
          {/* Go Back Button */}
          <TouchableOpacity onPress={router.back} style={styles.button}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity onPress={handleShare} style={styles.button}>
            <Ionicons name="share-social" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {flightSearchInfo?.tripType === "oneWay" &&
            flightSearchInfo?.departureFlight &&
            renderOneWayTicket()}
          {flightSearchInfo?.tripType === "roundWay" &&
            flightSearchInfo?.departureFlight &&
            flightSearchInfo?.returnFlight && <>{renderRoundTripTicket()}</>}

          <View style={styles.policyCard}>
            <Text style={styles.policyTitle}>Baggage Policy</Text>
            <View style={styles.baggageRow}>
              <Text style={styles.baggageLabel}>Cabin</Text>
              <Text style={styles.baggagecolon}>:</Text>
              <Ionicons
                name="bag-outline"
                size={20}
                color="#000"
                style={styles.baggageIcon}
              />
              <Text style={styles.baggageText}>7kg / Passenger</Text>
            </View>

            <View style={styles.baggageRow}>
              <Text style={styles.baggageLabel}>Check-In</Text>
              <Text style={styles.baggagecolon}>:</Text>
              <Ionicons
                name="briefcase-outline"
                size={20}
                color="#000"
                style={styles.baggageIcon}
              />
              <Text style={styles.baggageText}>15kg / Passenger</Text>
            </View>
          </View>

          {/* Cancellation Policy */}
          <View style={styles.cancellationPolicyCard}>
            <Text style={styles.cancellationPolicyTitle}>
              Cancellation Policy
            </Text>

            {/* Two-column layout for headings */}
            <View style={styles.cancellationPolicyRow}>
              <Text style={styles.cancellationPolicyColumnLeft}>
                Cancel Between
              </Text>
              <Text style={styles.cancellationPolicyColumnRight}>
                Refund Amount
              </Text>
            </View>

            {/* Rows of content */}
            <View style={styles.cancellationPolicyRow}>
              <Text style={styles.cancellationPolicyColumnLeft}>
                From now - 07 Nov, 19:30 (9:30)
              </Text>
              <Text style={styles.cancellationPolicyColumnRight}>₹6000</Text>
            </View>
            <View style={styles.cancellationPolicyRow}>
              <Text style={styles.cancellationPolicyColumnLeft}>
                07 Nov, 19:30 - 07 Nov, 22:30 (10;30)
              </Text>
              <Text style={styles.cancellationPolicyColumnRight}>₹____</Text>
            </View>
          </View>

          {/* Date Change Policy */}
          <View style={styles.cancellationPolicyCard}>
            <Text style={styles.cancellationPolicyTitle}>
              Date Change Policy
            </Text>

            {/* Two-column layout for headings */}
            <View style={styles.cancellationPolicyRow}>
              <Text style={styles.cancellationPolicyColumnLeft}>
                Cancel Between
              </Text>
              <Text style={styles.cancellationPolicyColumnRight}>
                Date Change Charges
              </Text>
            </View>

            {/* Rows of content */}
            <View style={styles.cancellationPolicyRow}>
              <Text style={styles.cancellationPolicyColumnLeft}>
                From now - 07 Nov, 19:30 (9:30)
              </Text>
              <Text style={styles.cancellationPolicyColumnRight}>₹6000</Text>
            </View>
            <View style={styles.cancellationPolicyRow}>
              <Text style={styles.cancellationPolicyColumnLeft}>
                07 Nov, 19:30 - 07 Nov, 22:30 (10;30)
              </Text>
              <Text style={styles.cancellationPolicyColumnRight}>₹____</Text>
            </View>
          </View>
          <View style={styles.Spacer}></View>
        </ScrollView>
      </View>
      {/* Bottm modal */}
      <View style={styles.bottomModal}>
        <View style={styles.modalContent}>
          <View style={styles.leftColumn}>
            {/* Display the price only if both flights are selected in roundtrip or just the departure in one-way */}
            <Text style={styles.ModalpriceText}>₹{totalPrice.toFixed(2)}</Text>

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
                router.push("/(tabs)/(home)/passengerdetails");
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
                    ₹{totalPrice.toFixed(2)}
                  </Text>
                </View>

                {/* Tax */}
                <View style={styles.pricebreakupRow}>
                  <Text style={styles.breakupAmount}>₹{tax.toFixed(2)}</Text>
                </View>

                {/* Total */}
                <View style={styles.pricebreakupRow}>
                  <Text style={styles.breakupAmountTotal}>
                    ₹{totalPriceWithTax.toFixed(2)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default TicketDetailScreen;
