import { getEmails } from "@/server/controllers/notify.controller";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);

    const result = await getEmails(limit, page);

    if (!result.success) {
      return new Response(JSON.stringify({ message: result.message }), { status: 400 });
    }

    return new Response(
      JSON.stringify({
        message: "Paginated emails fetched",
        data: result.data,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in /api/notify/paginated:", error);
    return new Response(
      JSON.stringify({ message: error?.message || "Failed to fetch paginated emails" }),
      { status: 500 }
    );
  }
};

