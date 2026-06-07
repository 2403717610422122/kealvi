import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { optionId } = await req.json();

    const { data: option, error: fetchError } = await supabase
      .from("options")
      .select("votes")
      .eq("id", optionId)
      .single();

    if (fetchError || !option) {
      return NextResponse.json(
        { error: "Option not found" },
        { status: 404 }
      );
    }

    const newVotes = (option.votes ?? 0) + 1;

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
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}