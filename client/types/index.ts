export type formError = {
  email?: boolean;
  phone?: boolean;
  username?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
};

export type dropdownItems = {
  label: string;
  value: number;
};
export type DayObject = {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
};

export interface CustomCalendarProps {
  flightPrices: Record<string, number>;
  onDayPress: (day: DayObject) => void;
  visible: boolean;
  onClose: () => void;
  minDate?: string;
  departureDate?: Date | null;
  returnDate?: Date | null;
  isOneWay?: boolean;
  minReturnDate?: string;
}

export type Airport = {
  ID: number;
  Name: string;
  City: string;
  Country: string;
  IATA: string;
  ICAO: string;
  Latitude: number;
  Longitude: number;
  Altitude: number;
  Timezone: number;
  Category: string;
  "Timezone Name": string;
  Type: string;
  Source: string;
};

export type foodType = {
  id: string;
  foodImg: string;
  foodname: string;
  veg: boolean;
  price: number;
  quantity: number;
};

export type BagageType = {
  id: string;
  img: string;
  kg: number;
  price: number;
};

export type seatMealBagageNavItemsTypes = {
  title: string;
  icon: any;
  id: string;
};
export enum FlightClass {
  economy = "economy",
  business = "business",
  first = "first",
}

export type Flight = {
  id: string;
  flightNumber: string;
  startTime: string;
  endTime: string;
  price: number;
  duration: number;
  stops: number;
  nonstop: boolean;
  type: string;
  flightLogo: any;
};

export type FlightSearchInfo = {
  tripType?: "oneWay" | "roundWay";
  departDate?: string | undefined;
  returnDate?: string | undefined;
  fromLocation?: string | undefined;
  toLocation?: string | undefined;
  class?: FlightClass | string;
  fromAirportData?: AirportData | undefined;
  toAirportData?: AirportData | undefined;
  departureFlight?: Flight | any;
  returnFlight?: Flight | any;
  departureFlightId?: string | undefined;
  returnFlightId?: string | undefined;
};
export type FlightBookingPrice = {
  baseFare?: number | undefined;
  tax?: number | undefined;
  totalFare?: number | undefined;
  baggageDetails?: { kg: number; price: number } | undefined;
  foodPrice?: foodType[] | undefined;
};
export type PassengerInfo = {
  gender: boolean | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  Dob: string | undefined;
};
export type TravelInfo = {
  adults: number;
  children: number;
  infants: number;
  adultInfo?: PassengerInfo[];
  childrenInfo?: PassengerInfo[];
  infantsInfo?: PassengerInfo[];
  selectedOption: "Student" | "Senior Citizen" | "Armed Force" | null | string;
};

export type AirportData = {
  Name: string | undefined;
  IATA: string | undefined;
  City: string | undefined;
};
export type FlightStateType = {
  flightBookingPrice: FlightBookingPrice | null;
  flightSearchInfo: FlightSearchInfo | null;
  travelInfo: TravelInfo | any;
  foodData: foodType[];
  selectedFood: foodType[] | undefined;
  addFlightSearchInfo: (flightDetails: FlightSearchInfo) => void;
  addTravelInfo: (travelDetails: TravelInfo) => void;
  addFlightBookingPrice: (flightPrice: FlightBookingPrice) => void;
  addFood: (food: foodType) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
};
