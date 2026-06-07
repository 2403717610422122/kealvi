import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { pollId, optionId } = await req.json();

    const { error } = await supabase.from("votes").insert({
      question_id: Number(pollId),
      option_id: Number(optionId),
      voter_id: "anonymous",
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}