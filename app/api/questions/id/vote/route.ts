import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { voterId } = await req.json();

  // Prevent duplicate vote
  const { data: existingVote } = await supabase
    .from("votes")
    .select("id")
    .eq("question_id", Number(id))
    .eq("voter_id", voterId)
    .maybeSingle();

  if (existingVote) {
    return NextResponse.json(
      { error: "Already voted" },
      { status: 409 }
    );
  }

  const { error } = await supabase
    .from("votes")
    .insert({
      question_id: Number(id),
      voter_id: voterId,
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}