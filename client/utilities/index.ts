import {
  BagageType,
  dropdownItems,
  foodType,
  seatMealBagageNavItemsTypes,
} from "@/types";
const dropDownItemsForCountryCodes: dropdownItems[] = [
  { label: " (+1) United States", value: +1 },
  { label: "(+91) India ", value: +91 },
  { label: " (+44) United Kingdom", value: +44 },
  { label: "(+1) Canada ", value: +1 },
  { label: "(+61) Australia ", value: +61 },
];

const seatData = [
  {
    left: [
      {
        col1: "A",
        col2: "B",
        col3: "C",
      },
      {
        seat1: 1,
        seat2: 2,
        seat3: 3,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
    ],
  },
  { middle: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
  {
    right: [
      {
        col1: "D",
        col2: "E",
        col3: "F",
      },
      {
        seat1: 1,
        seat2: 2,
        seat3: 3,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
      {
        seat4: 4,
        seat5: 5,
        seat6: 6,
      },
    ],
  },
];

const foodData: foodType[] = [
  {
    id: "1",
    foodImg:
      "https://sandhyahariharan.co.uk/wp-content/uploads/2022/07/paneer-butter-masala-2.jpg",
    foodname: "Paneer Butter",
    veg: true,
    price: 500,
    quantity: 0,
  },
  {
    id: "2",
    foodImg:
      "https://www.whiskaffair.com/wp-content/uploads/2020/06/Chicken-Tikka-2-3.jpg",
    foodname: "Chicken Tikka",
    veg: false,
    price: 600,
    quantity: 0,
  },
  {
    id: "3",
    foodImg:
      "https://www.indianveggiedelight.com/wp-content/uploads/2017/07/veg-pulao-karnataka-style-featured.jpg",
    foodname: "Veg Pulao",
    veg: true,
    price: 450,
    quantity: 0,
  },

  {
    id: "4",
    foodImg:
      "https://thecozycook.com/wp-content/uploads/2021/08/Spinach-Pasta-f3.jpg",
    foodname: "Spinach Pasta",
    veg: true,
    price: 550,
    quantity: 0,
  },
  {
    id: "5",
    foodImg:
      "https://yeyfood.com/wp-content/uploads/2024/08/WEB1indian_chicken_biryani._served_on_a_white_plate._s_77c8f1ca-f01e-4a4d-9f2c-61bce785c1d7_3-735x735.jpg",
    foodname: "Chicken Biryani",
    veg: false,
    price: 650,
    quantity: 0,
  },
  {
    id: "6",
    foodImg:
      "https://veenaazmanov.com/wp-content/uploads/2022/04/Garden-Salad-Recipe23.jpg",
    foodname: "Garden Fresh Salad",
    veg: true,
    price: 300,
    quantity: 0,
  },
];

const bagageData: BagageType[] = [
  { id: "1", img: "", kg: 3, price: 900 },
  { id: "2", img: "", kg: 5, price: 1000 },
  { id: "3", img: "", kg: 10, price: 1500 },
  { id: "4", img: "", kg: 15, price: 1800 },
  { id: "5", img: "", kg: 20, price: 2000 },
  { id: "6", img: "", kg: 20, price: 2000 },
  { id: "7", img: "", kg: 20, price: 2000 },
  { id: "8", img: "", kg: 20, price: 2000 },
];

const seatMealBagageNavItems: seatMealBagageNavItemsTypes[] = [
  {
    title: "Seat",
    icon: "seat-passenger",
    id: "22",
  },
  {
    title: "Meal",
    icon: "silverware-variant",
    id: "4",
  },
  {
    title: "Baggage",
    icon: "bag-suitcase-outline",
    id: "5",
  },
];
export {
  dropDownItemsForCountryCodes,
  seatData,
  foodData,
  bagageData,
  seatMealBagageNavItems,
};
