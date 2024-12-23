import {
  FlightBookingPrice,
  FlightSearchInfo,
  FlightStateType,
  foodType,
  TravelInfo,
} from "@/types";
import { foodData } from "@/utilities";
import { create } from "zustand";

export const useFlightAppData = create<FlightStateType>((set) => ({
  flightBookingPrice: null,
  flightSearchInfo: null,
  travelInfo: null,
  foodData: foodData,
  selectedFood: [],

  addFlightSearchInfo: (flightDetails: FlightSearchInfo) => {
    set((state) => ({
      flightSearchInfo: { ...state.flightSearchInfo, ...flightDetails },
    }));
  },
  addTravelInfo: (travelDetails: TravelInfo) => {
    set((state) => ({
      travelInfo: { ...state.travelInfo, ...travelDetails } as TravelInfo,
    }));
  },
  addFlightBookingPrice: (flightPrice: FlightBookingPrice) => {
    set((state) => ({
      flightBookingPrice: {
        ...state.flightBookingPrice,
        ...flightPrice,
      } as FlightBookingPrice,
    }));
  },
  addFood: (food: foodType) => {
    set((state) => {
      console.log(state.selectedFood);
      return { selectedFood: [...(state.selectedFood || []), food] };
    });
  },
  increaseQuantity: (id: string) => {
    set((state) => {
      const findFoodItme = state.foodData?.find((item) => item.id === id);
      if (findFoodItme) {
        findFoodItme.quantity += 1;
      }
      console.log(state.selectedFood);
      return { foodData: [...state.foodData] };
    });
  },
  decreaseQuantity: (id: string) => {
    set((state) => {
      const findFoodItme = state.foodData?.find((item) => item.id === id);
      if (findFoodItme) {
        if (findFoodItme.quantity !== 0) {
          findFoodItme.quantity -= 1;
        }
      }
      console.log(state.selectedFood);
      return { foodData: [...state.foodData] };
    });
  },
}));
