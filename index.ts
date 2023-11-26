import { logging } from "./src/utils"
import { sendSlackMessage } from "./src/slack"
import {
  getHiltonHotels, 
  processHiltonHotelsData, 
  saveHiltonHotelData, 
} from "./src/hilton"

async function main() { 
  logging({ event: "Starting Flight and Hotel Scraper", data: "Starting Flight and Hotel Scraper" })

  // TODO: Come back to Flights (southwest.ts and american.ts) in about a Month. Prices aren't updated for next year.
  const hiltonHotels = await getHiltonHotels()
  logging({ event: "Hilton Hotels", data: `Found ${hiltonHotels.data.hotelSummaryOptions.hotels.length}` })

  const hiltonHotelSummary = await processHiltonHotelsData({ hiltonData: hiltonHotels })
  logging({ event: "Hilton Hotels Processed Data", data: `Processed ${hiltonHotelSummary.length}` })
  
  const hiltonHotelSummarySaved = await saveHiltonHotelData({ hiltonHotelSummary: hiltonHotelSummary })
  logging({ event: "Hilton Hotels Saved", data: `Saved Hotel Data` })

  sendSlackMessage({ logString: `Hilton Hotels Processed: ${hiltonHotelSummary.length}`, status: "success", failure: false })
}


main()
