import { incrementVisitsCounter } from "@/server/controllers/sitevisits.controller";

export const POST = async (req: Request) => {
  try {
    const result = await incrementVisitsCounter();
    return new Response(
      JSON.stringify({ message: result.message }),
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error in /api/notify route:", error);
    return new Response(
      JSON.stringify({ message: error?.message || "Failed to send email" }),
      { status: 500 }
    );
  }
}

