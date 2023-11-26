import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { hotelPrices, flightPrices } from '../db/schema';

// TODO: This can be cut
export async function recordPricingHotel({ date, location, price }: { date: string, location: string, price: string }): Promise<boolean> {
  const client = createClient({
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_TOKEN!,
  });

  const db = drizzle(client);

  const insertHotelPrice = await db.insert(hotelPrices).values({
    dateString: date,
    locationAddress: location,
    price: price,
  }).execute();

  if (!insertHotelPrice) {
    return false
  } else {
    return true
  }
}


export async function recordPricingFlight({ date, location, price }: { date: string, location: string, price: string }): Promise<boolean> {
  const client = createClient({
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_TOKEN!,
  });

  const db = drizzle(client);

  const insertFlightPrice = await db.insert(flightPrices).values({
    dateString: date,
    flightNumber: location,
    price: price,
  }).execute();

  if (!insertFlightPrice) {
    return false
  } else {
    return true
  }
}
