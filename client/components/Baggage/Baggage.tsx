import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React from "react";
import { bagageData } from "@/utilities";
import { BagageType } from "@/types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFlightAppData } from "@/statemanagement/store";

const Baggage = () => {
  const { addFlightBookingPrice } = useFlightAppData((state) => state);
  const [selectedBagage, setSelectedBagage] =
    React.useState<BagageType | null>();
  const addBaggage = (item: BagageType) => {
    setSelectedBagage(item);
    addFlightBookingPrice({
      baggageDetails: { kg: item.kg, price: item.price },
    });
  };

  return (
    <ScrollView>
      <View style={styles.bottom}>
        {bagageData.map((item: BagageType, ind: number) => (
          <TouchableOpacity
            key={ind}
            style={[
              styles.bagageContainer,
              selectedBagage?.id === item.id && {
                borderWidth: 1,
                borderColor: "#01493E",
              },
            ]}
          >
            <View style={styles.left}>
              <View style={styles.imageContainer}>
                <MaterialCommunityIcons
                  name={"bag-suitcase"}
                  size={45}
                  color="gray"
                />
                ;
              </View>
              <View style={styles.bagageDesc}>
                <View>
                  <Text
                    style={styles.bagageTitle}
                  >{`Additional ${item.kg} kg`}</Text>
                  <Text style={styles.bagagePrice}> ₹ {item.price}</Text>
                </View>
              </View>
            </View>
            <View style={styles.right}>
              <View style={styles.add}>
                <TouchableOpacity
                  style={[
                    styles.addbtn,
                    selectedBagage?.id === item.id && styles.active,
                  ]}
                  onPress={() => {
                    addBaggage(item);
                  }}
                >
                  <Text
                    style={[
                      selectedBagage?.id === item.id && { color: "#fff" },
                    ]}
                  >
                    {selectedBagage?.id == item.id ? "Added" : "Add"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  bottom: {
    padding: 6,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f2f2f2",
    gap: 15,
    paddingBottom: 110,
  },
  bagageContainer: {
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
  },
  left: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    width: "70%",
  },
  imageContainer: {
    height: "100%",
    width: 100,
    padding: 5,
    backgroundColor: "#f2f2f2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  bagageDesc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  bagageImg: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  bagageTitle: {
    fontWeight: "500",
    fontSize: 15,
  },
  bagagePrice: {
    marginTop: 4,
  },
  right: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  add: {
    backgroundColor: "#f2f2f2",

    width: "80 %",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addbtn: {
    padding: 5,
    height: "100%",
    width: "100%",
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  active: {
    backgroundColor: "#01493E",
  },
});

export default Baggage;
