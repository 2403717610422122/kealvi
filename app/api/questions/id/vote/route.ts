import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest, context: any) {
  const id = context?.params?.id;

  console.log("VOTE API HIT:", id);

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  // get current votes
  const { data, error: fetchError } = await supabase
    .from("questions")
    .select("votes")
    .eq("id", id)
    .single();

  if (fetchError) {
    return NextResponse.json(
      { error: fetchError.message },
      { status: 500 }
    );
  }

  // update votes
  const { error: updateError } = await supabase
    .from("questions")
    .update({
      votes: (data.votes ?? 0) + 1,
    })
    .eq("id", id);

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}