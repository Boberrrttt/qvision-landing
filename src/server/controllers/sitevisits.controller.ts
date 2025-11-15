import { incrementWebsiteVisits } from "../firebase/services/sitevisits.service"

const incrementVisitsCounter = async () => {
  try {
    await incrementWebsiteVisits();
    return { success: true, message: "Website visit count incremented." };
  } catch (error) {
    console.error('Failed to increment counter', error);
    return { success: false, message: "Failed to increment visit count." };
  }
}


export { incrementVisitsCounter }
