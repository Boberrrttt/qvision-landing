import { sendEmail } from "@/server/controllers/notify.controller";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ message: "Email is required" }),
        { status: 400 }
      );
    }

    const result = await sendEmail(email);

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
