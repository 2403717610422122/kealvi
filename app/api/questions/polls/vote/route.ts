import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { optionId } = await req.json();

  const { data: option } = await supabase
    .from("options")
    .select("votes")
    .eq("id", optionId)
    .single();

  if (!option) {
    return NextResponse.json(
      { error: "Option not found" },
      { status: 404 }
    );
  }

  await supabase
    .from("options")
    .update({
      votes: (option.votes || 0) + 1,
    })
    .eq("id", optionId);

  return NextResponse.json({ success: true });
}