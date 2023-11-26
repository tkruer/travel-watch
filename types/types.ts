// To parse this data:
//
//   import { Convert, HiltonHotels } from "./file";
//
//   const hiltonHotels = Convert.toHiltonHotels(json);

export interface HiltonHotels {
    data:       Data;
    extensions: Extensions;
}

export interface Data {
    hotelSummaryOptions: HotelSummaryOptions;
}

export interface HotelSummaryOptions {
    hotels: Hotel[];
}

export interface Hotel {
    _id:                        string;
    amenityIds:                 string[];
    brandCode:                  string;
    ctyhocn:                    string;
    distance:                   null;
    distanceFmt:                string;
    facilityOverview:           FacilityOverview;
    name:                       string;
    display:                    Display;
    contactInfo:                ContactInfo;
    disclaimers:                any[];
    address:                    Address;
    localization:               Localization;
    masterImage:                MasterImage;
    images:                     Images;
    tripAdvisorLocationSummary: TripAdvisorLocationSummary | null;
    leadRate:                   LeadRate | null;
}

export interface Address {
    addressLine1: string;
    city:         string;
    country:      Country;
    countryName:  CountryName;
    state:        State;
    stateName:    StateName;
    _id:          string;
}

export enum Country {
    Us = "US",
}

export enum CountryName {
    Usa = "USA",
}

export enum State {
    Hi = "HI",
}

export enum StateName {
    Hawaii = "Hawaii",
}

export interface ContactInfo {
    phoneNumber: string;
}

export interface Display {
    open:           boolean;
    openDate:       Date | null;
    preOpenMsg:     null;
    resEnabled:     boolean;
    resEnabledDate: Date | null;
    treatments:     any[];
}

export interface FacilityOverview {
    allowAdultsOnly: boolean;
}

export interface Images {
    carousel: MasterImage[];
}

export interface MasterImage {
    altText:  string;
    variants: Variant[];
}

export interface Variant {
    size: Size;
    url:  string;
}

export enum Size {
    Md = "md",
    Sm = "sm",
    Xs = "xs",
}

export interface LeadRate {
    lowest:  Lowest;
    hhonors: Hhonors;
}

export interface Hhonors {
    lead: Lead;
    max:  Max;
    min:  Max;
}

export interface Lead {
    dailyRmPointsRate:       number;
    dailyRmPointsRateNumFmt: string;
    ratePlan:                LeadRatePlan;
}

export interface LeadRatePlan {
    ratePlanName: RatePlanName;
    ratePlanDesc: string;
}

export enum RatePlanName {
    HonorsDiscount = "Honors Discount",
    HonorsDiscountNonRefundable = "Honors Discount Non-refundable",
    HonorsDiscountSemiFlex = "Honors Discount Semi-Flex",
    PremiumRoomRewards = "Premium Room Rewards",
    StandardRoomReward = "Standard Room Reward",
}

export interface Max {
    rateAmount:                number;
    rateAmountFmt:             string;
    dailyRmPointsRate:         number;
    dailyRmPointsRateRoundFmt: string;
    dailyRmPointsRateNumFmt:   string;
    ratePlan:                  MaxRatePlan;
}

export interface MaxRatePlan {
    ratePlanCode: string;
}

export interface Lowest {
    rateAmount:    number;
    rateAmountFmt: string;
    ratePlanCode:  string;
    ratePlan:      LeadRatePlan;
}

export interface Localization {
    currencyCode: CurrencyCode;
    coordinate:   Coordinate;
}

export interface Coordinate {
    latitude:  number;
    longitude: number;
}

export enum CurrencyCode {
    Usd = "USD",
}

export interface TripAdvisorLocationSummary {
    numReviews:     number;
    rating:         number;
    ratingFmt:      string;
    ratingImageUrl: string;
    reviews:        Review[];
}

export interface Review {
    id:             number;
    rating:         number;
    helpfulVotes:   number;
    ratingImageUrl: string;
    text:           string;
    travelDate:     TravelDate;
    user:           User;
    title:          string;
}

export enum TravelDate {
    The202304 = "2023-04",
    The202306 = "2023-06",
    The202307 = "2023-07",
    The202308 = "2023-08",
    The202309 = "2023-09",
    The202310 = "2023-10",
    The202311 = "2023-11",
}

export interface User {
    username: string;
}

export interface Extensions {
    logSearch: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toHiltonHotels(json: string): HiltonHotels {
        return JSON.parse(json);
    }

    public static hiltonHotelsToJson(value: HiltonHotels): string {
        return JSON.stringify(value);
    }
}

////////////////////////////////////////////////////////////////////////////////////////

export interface HiltonHotelSummaryData {
    hotelName: string;
    hotelPhoneNumber: string;
    date: string;
    location: string;
    price: string;
}