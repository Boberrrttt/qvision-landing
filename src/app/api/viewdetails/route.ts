import { getViewDetailsTotal, incrementViewDetailsCounter } from "@/server/controllers/viewdetails.controller";

export const POST = async (req: Request) => {
  try {
    const result = await incrementViewDetailsCounter();
    return new Response(
      JSON.stringify({ message: result.message }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error in /api/viewdetails route:", error);
    return new Response(
      JSON.stringify({ message: error?.message || "Failed to increment view details" }),
      { status: 500 }
    );
  }
}


export const GET = async (req: Request) => {
  try {
    const result = await getViewDetailsTotal();

    return new Response(
      JSON.stringify({ message: result.message, data: result.data }),
    )
  } catch (error: any) {
    console.error("Error in /api/viewdetails route:", error);
    return new Response(
      JSON.stringify({ message: error?.message || "Failed to fetch view details" }),
    );
  }
}

