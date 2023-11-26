import { 
    HiltonHotels,
    HiltonHotelSummaryData, 
} from "../types/types"
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { hotelPrices } from '../db/schema';

export async function getHiltonHotels(): Promise<HiltonHotels> {
    // Gets all of the Hilton hotels in Hawaii for selected dates
    const res = await fetch("https://www.hilton.com/graphql/customer?appName=dx_shop_search_app&operationName=hotelSummaryOptions&originalOpName=hotelSummaryOptions_Variant&bl=en", {
        "body": "{\"query\":\"query hotelSummaryOptions($language: String!, $input: HotelSummaryOptionsInput) {\\n  hotelSummaryOptions(language: $language, input: $input) {\\n    hotels {\\n      _id: ctyhocn\\n      amenityIds\\n      brandCode\\n      ctyhocn\\n      distance\\n      distanceFmt\\n      facilityOverview {\\n        allowAdultsOnly\\n      }\\n      name\\n      display {\\n        open\\n        openDate\\n        preOpenMsg\\n        resEnabled\\n        resEnabledDate\\n        treatments\\n      }\\n      contactInfo {\\n        phoneNumber\\n      }\\n      disclaimers {\\n        desc\\n        type\\n      }\\n      address {\\n        addressLine1\\n        city\\n        country\\n        countryName\\n        state\\n        stateName\\n        _id\\n      }\\n      localization {\\n        currencyCode\\n        coordinate {\\n          latitude\\n          longitude\\n        }\\n      }\\n      masterImage(variant: searchPropertyImageThumbnail) {\\n        altText\\n        variants {\\n          size\\n          url\\n        }\\n      }\\n      images {\\n        carousel(variant: searchPropertyImageThumbnail) {\\n          altText\\n          variants {\\n            size\\n            url\\n          }\\n        }\\n      }\\n      tripAdvisorLocationSummary {\\n        numReviews\\n        rating\\n        ratingFmt(decimal: 1)\\n        ratingImageUrl\\n        reviews {\\n          id\\n          rating\\n          helpfulVotes\\n          ratingImageUrl\\n          text\\n          travelDate\\n          user {\\n            username\\n          }\\n          title\\n        }\\n      }\\n      leadRate {\\n        lowest {\\n          rateAmount(currencyCode: \\\"USD\\\")\\n          rateAmountFmt(decimal: 0, strategy: trunc)\\n          ratePlanCode\\n          ratePlan {\\n            ratePlanName\\n            ratePlanDesc\\n          }\\n        }\\n        hhonors {\\n          lead {\\n            dailyRmPointsRate\\n            dailyRmPointsRateNumFmt: dailyRmPointsRateFmt(hint: number)\\n            ratePlan {\\n              ratePlanName\\n              ratePlanDesc\\n            }\\n          }\\n          max {\\n            rateAmount\\n            rateAmountFmt\\n            dailyRmPointsRate\\n            dailyRmPointsRateRoundFmt: dailyRmPointsRateFmt(hint: round)\\n            dailyRmPointsRateNumFmt: dailyRmPointsRateFmt(hint: number)\\n            ratePlan {\\n              ratePlanCode\\n            }\\n          }\\n          min {\\n            rateAmount\\n            rateAmountFmt\\n            dailyRmPointsRate\\n            dailyRmPointsRateRoundFmt: dailyRmPointsRateFmt(hint: round)\\n            dailyRmPointsRateNumFmt: dailyRmPointsRateFmt(hint: number)\\n            ratePlan {\\n              ratePlanCode\\n            }\\n          }\\n        }\\n      }\\n    }\\n  }\\n}\",\"operationName\":\"hotelSummaryOptions\",\"variables\":{\"language\":\"en\",\"input\":{\"quadrantId\":\"root::sw::nw::sw\"}}}",
        "cache": "default",
        "credentials": "include",
        "headers": {
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.9", // TODO: Watch Authorization, hltClientMessageId, x-dtpc, visitorId 
            "Authorization": "Bearer DX.eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00iLCJwaWQiOiJ3ZWIiLCJraWQiOiI4UVl1RTZfdHBValdjUmVnem1RZFlBaF9RYlk1ckVqUlpPTThwWmNKeU5BIn0.cze3CoOWS_iZS86vdjHejTphRMkEOuMHhNRhHByMoffVCIb3FO7JaDx1xG620k29TwkHXZ0aOI5_51tHzMSB2Zw03K6977GserdxZ7oOs5kw2Ji1QjUTYbs3-QhxAM_kcXYK5tfonyJvMG5nPPnNl1KA2mCtBDe2mSkea5HYZ2NFZqnixzgQ4lwT98GYFX5qce_YlRMWv-0ztGAqPM7HVQuH-bncGETb6TJe31ePcus92aNCRuWVo6ZA-wQ7wSNZZcr3kk3QlSOqgmNMf0lU062zLGHtNUTbhBgxjbMR6O7y6j_L4qM9yz6BxSeitvQ3zCChO0jiJSRBpO9RKaWG2w.IHEMsGASDyi_kl6a.uKSfwDn1TppEHA-AE_Ft4wTflWDof5fOq47s6m62q-sWlyYO8IqP869adRjMBkRuOWyox9wFT2PVGWZMfxKkWStcg0_QAzdjKN9Gy12dKEgzibKKZdOgaZiluDvSuMHK_w39qPKGEm_7BS2K8STAJfKsyQAT5rqU_5gGBKeNyrqPLW_q6YPSwLtMPnfLkLskL3-Y4pCwDQbMvIyu7h8wyelM0AHNj5q58LGb7Z9dKhLFpiomWkdlhTi64t_IUB_TCHw8_2haiVXN-bRUjOxW4cKPP25omDebYviPw_TtVwBn3WnIGdIO5upAr1hXVa5m1Pc_D-NbwmX1wmDijhGp0jOmEx5oBSF5pzceWw-BVvX1uAzv7okluJdMFpfleyJJ5z59oZ6896W4XP8wANsgMvpOwYnQ-qvtA6rQIvVFr2lVCZTI-y1suAjbYr4P6-fxEYW7wg3OCHLkGsFhaxjIgRkUd3DXXWxN9aKo_GGhyUVdQgS_ZmUNFkeFVUT61kZj0vCsovH6Com8lvM9Sy33vpGOzmktJsIERcravRY20hDqxidA8jO887xeJGYnmASmOWiQHwdUSVvz_GQHj04ACF76qhdCK2Xn3Vm5kCpTpYGJAHp4oer3X2x7wDfJr2zy1Eyg4fIyhZ-gfyNuaBp13-oJIc1VLXJUb9g0zrc5yWMM33PDlVKyRQs6MOMtDffRV69OWZp3LtbaU_qeIttH2kApcSGHTw.RLIuai2PndejiOyXu9vRTA",
            "Content-Type": "application/json",
            "dx-platform": "web",
            "hltClientMessageId": "0308c738-a9dc-4a24-b193-d0e630179c1e-8fb827649a4845698aab4b79337d4342",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
            "visitorId": "0308c738-a9dc-4a24-b193-d0e630179c1e",
            "x-dtpc": "8$23298166_657h11vNGIQJLCFKSMFUCHOOUCVPVKJSFNMUKUR-0e0"
        },
        "method": "POST",
        "mode": "cors",
        "redirect": "follow",
        "referrer": "https://www.hilton.com/en/search/",
        "referrerPolicy": "no-referrer-when-downgrade"
    })
    const data = await res.json() as HiltonHotels
    return data
}

export async function processHiltonHotelsData({ hiltonData }: { hiltonData: HiltonHotels }): Promise<HiltonHotelSummaryData[]> {
    let hotelSummaryData: HiltonHotelSummaryData[] = []
    for (const hotelData of hiltonData.data.hotelSummaryOptions.hotels) {
        const hotelAdress: string = `${hotelData.address.addressLine1}, ${hotelData.address.city}, ${hotelData.address.state}, ${hotelData.address.countryName}`
        const hotelSummary: HiltonHotelSummaryData = {
           hotelName: hotelData.name,
           hotelPhoneNumber: hotelData.contactInfo.phoneNumber,
           location: hotelAdress,
           price: hotelData.leadRate?.lowest?.rateAmountFmt || hotelData.leadRate?.hhonors?.min?.rateAmountFmt || "N/A",
           date: new Date().toISOString(),
        }
        hotelSummaryData.push(hotelSummary)        
    }    
    return hotelSummaryData
}

export async function saveHiltonHotelData({ hiltonHotelSummary }: { hiltonHotelSummary: HiltonHotelSummaryData[] }): Promise<boolean> {
    let allSuccessful = true;
    const client = createClient({
        url: process.env.TURSO_DB_URL!,
        authToken: process.env.TURSO_DB_TOKEN!,
    });
    
    const db = drizzle(client);

    for (const hotelSummary of hiltonHotelSummary) {        
        try {
            const insertHotelPrice = await db.insert(hotelPrices).values({
                hotelName: hotelSummary.hotelName,
                hotelPhoneNumber: hotelSummary.hotelPhoneNumber,
                dateString: hotelSummary.date,
                locationAddress: hotelSummary.location,
                price: hotelSummary.price,
            }).execute();
        
            if (!insertHotelPrice) {
                allSuccessful = false;
                console.error('Failed to insert:', hotelSummary);
            }
        } catch (error) {
            console.error('Error inserting data:', error);
            allSuccessful = false;
        }
    }

    return allSuccessful;
}
