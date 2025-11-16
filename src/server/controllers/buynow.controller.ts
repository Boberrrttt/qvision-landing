import { getPreOrders } from "../firebase/services/buynow.service"

const getPreOrdersCount = async () => {
  try {
    const response = await getPreOrders();
    return { success: true, data: response, message: "Fetched total pre orders" };
  } catch (error) {
    console.error('Failed to fetch total pre orders', error);
    return { success: false, data: null, message: "Failed to fetch total pre orders" };
  }
}

export { getPreOrdersCount }
