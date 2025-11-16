import { getPreOrdersCount } from "@/server/controllers/buynow.controller";

export const GET = async (req: Request) => {
  try {
    const result = await getPreOrdersCount();

    return new Response(
      JSON.stringify({ message: result.message, data: result.data }),
    )
  } catch (error: any) {
    console.error("Error in /api/buynow route:", error);
    return new Response(
      JSON.stringify({ message: error?.message || "Failed to fetch pre orders" }),
    );
  }
}
