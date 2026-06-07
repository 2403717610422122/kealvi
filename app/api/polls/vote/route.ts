import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { optionId } = await req.json();

    // 1. get current votes
    const { data, error: fetchError } = await supabase
      .from("options")
      .select("votes")
      .eq("id", optionId)
      .single();

    if (fetchError) {
      return NextResponse.json(
        { error: fetchError.message },
        { status: 500 }
      );
    }

    // 2. increment
    const newVotes = (data?.votes ?? 0) + 1;

    const { error: updateError } = await supabase
      .from("options")
      .update({ votes: newVotes })
      .eq("id", optionId);

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      votes: newVotes,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}