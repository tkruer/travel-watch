import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const hotelPrices = sqliteTable("HotelPrices", {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  dateString: text('dateString'),
  locationAddress: text('locationAddress'),
  hotelName: text('hotelName'),
  hotelPhoneNumber: text('hotelPhoneNumber'),
  price: text('price')
})

export const flightPrices = sqliteTable("FlightPrices", {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    dateString: text('dateString'),
    flightNumber: text('flightNumber'),
    price: text('price')
})

export type HotelPrices = typeof hotelPrices.$inferSelect
export type FlightPrices = typeof flightPrices.$inferSelect

export type HotelPricesInsert = typeof hotelPrices.$inferInsert
export type FlightPricesInsert = typeof flightPrices.$inferInsert


