import { getTotalVisits, incrementVisitsCounter } from "@/server/controllers/sitevisits.controller";

export const POST = async (req: Request) => {
  try {
    const result = await incrementVisitsCounter();
    return new Response(
      JSON.stringify({ message: result.message }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error in /api/visits route:", error);
    return new Response(
      JSON.stringify({ message: error?.message || "Failed to increment visits" }),
      { status: 500 }
    );
  }
}


export const GET = async (req: Request) => {
  try {
    const result = await getTotalVisits();

    return new Response(
      JSON.stringify({ message: result.message, data: result.data }),
    )
  } catch (error: any) {
    console.error("Error in /api/visits route:", error);
    return new Response(
      JSON.stringify({ message: error?.message || "Failed to fetch visits" }),
    );
  }
}
