import { getViewDetailsCount, incrementViewDetails } from "../firebase/services/viewdetails.service";

const incrementViewDetailsCounter = async () => {
  try {
    await incrementViewDetails();
    return { success: true, message: "view details counter incremented." };
  } catch (error) {
    console.error('Failed to increment counter', error);
    return { success: false, message: "Failed to increment view details count." };
  }
}

const getViewDetailsTotal = async () => {
  try {
    const response = await getViewDetailsCount();
    return { success: true, data: response, message: "Fetched total view details count" };
  } catch (error) {
    console.error('Failed to fetch view details count', error);
    return { success: false, data: null, message: "Failed to total view details count." };
  }

}

export { incrementViewDetailsCounter, getViewDetailsTotal }

