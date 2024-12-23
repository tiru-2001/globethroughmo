import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFlightAppData } from "@/statemanagement/store";
import { foodType } from "@/types";
const Foodcomponent = () => {
  const {
    foodData,
    selectedFood,
    addFood,
    increaseQuantity,
    decreaseQuantity,
  } = useFlightAppData((state) => state);
  const [selectedFoodType, setSelectedFoodType] =
    React.useState<foodType | null>();
  console.log(selectedFood);

  const handleIncreDecre = (type: string, item: foodType) => {
    const ifExist = selectedFood?.find((sfood) => item.id === sfood.id);
    if (!ifExist) {
      addFood({
        foodImg: item.foodImg,
        foodname: item.foodname,
        id: item.id,
        price: item.price,
        veg: item.veg,
        quantity: 1,
      });
    } else {
      if (type === "incre") {
        console.log("incre");
        increaseQuantity(item.id);
      } else {
        console.log("hie");
        decreaseQuantity(item.id);
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.bottom}>
        {foodData.map((item, ind: number) => (
          <View
            key={ind}
            style={[
              styles.foodItemContainer,
              selectedFood?.some((sfood) => sfood.id === item.id)
                ? { borderWidth: 1, borderColor: "#01493E" }
                : {},
            ]}
          >
            <View style={styles.left}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.foodImg}
                  source={{
                    uri: item.foodImg,
                  }}
                />
              </View>
              <View style={styles.foodDesc}>
                <View>
                  <Text style={styles.foodName}>{item.foodname}</Text>
                  <Text> ₹ {item.price}</Text>
                  <View>
                    {item.veg ? (
                      <Image
                        style={{ height: 15, width: 15 }}
                        source={{
                          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/2048px-Veg_symbol.svg.png",
                        }}
                      />
                    ) : (
                      <Image
                        style={{ height: 15, width: 15 }}
                        source={{
                          uri: "https://banner2.cleanpng.com/20180401/zyq/avh3xfkvf.webp",
                        }}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.right]}>
              <View
                style={[
                  styles.quantity,
                  selectedFood?.some((sfood) => sfood.id === item.id)
                    ? { backgroundColor: "#01493E" }
                    : {},
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    handleIncreDecre("decre", item);
                  }}
                  style={[
                    { cursor: "pointer" },

                    selectedFood?.some((sfood) => sfood.id === item.id)
                      ? { backgroundColor: "#01493E" }
                      : {},
                  ]}
                >
                  <MaterialCommunityIcons
                    style={[
                      selectedFood?.some((sfood) => sfood.id === item.id)
                        ? { color: "#fff" }
                        : {},
                    ]}
                    name={"minus"}
                    size={18}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    selectedFood?.some((sfood) => sfood.id === item.id)
                      ? { color: "#fff" }
                      : {},
                  ]}
                >
                  {item.quantity}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleIncreDecre("incre", item);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <MaterialCommunityIcons
                    style={[
                      selectedFood?.some((sfood) => sfood.id === item.id)
                        ? { color: "#fff" }
                        : {},
                    ]}
                    name={"plus"}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default Foodcomponent;

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
  foodItemContainer: {
    borderRadius: 5,
    backgroundColor: "#fff",
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    minHeight: 100,
  },
  left: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    flex: 1,
  },
  imageContainer: {
    height: "100%",
    width: 100,
    padding: 5,
  },
  foodDesc: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    paddingVertical: 10,
    paddingHorizontal: 13,
    flexWrap: "wrap",
    flex: 1,
  },
  foodImg: {
    height: "100%",
    width: "100%",
    borderRadius: 5,
    overflow: "hidden",
  },
  foodName: {
    fontWeight: "500",
    fontSize: 13,
    wordWrap: "break-word",
  },
  right: {
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  quantity: {
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    width: 110,
  },
});
