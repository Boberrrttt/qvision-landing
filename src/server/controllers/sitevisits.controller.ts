import { getSiteVisits, incrementWebsiteVisits } from "../firebase/services/sitevisits.service"

const incrementVisitsCounter = async () => {
  try {
    await incrementWebsiteVisits();
    return { success: true, message: "Website visit count incremented." };
  } catch (error) {
    console.error('Failed to increment counter', error);
    return { success: false, message: "Failed to increment visit count." };
  }
}

const getTotalVisits = async () => {
  try {
    const response = await getSiteVisits();
    return { success: true, data: response, message: "Fetched total site visits" };
  } catch (error) {
    console.error('Failed to fetch visit count', error);
    return { success: false, data: null, message: "Failed to fetch visit count." };
  }
}


export { incrementVisitsCounter, getTotalVisits }
