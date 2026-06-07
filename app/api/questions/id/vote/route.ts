import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // 1. get current votes
  const { data, error: fetchError } = await supabase
    .from("questions")
    .select("votes")
    .eq("id", id)
    .single();

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  // 2. update incremented value
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