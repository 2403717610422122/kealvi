import { supabase } from "@/lib/supabase";
import PollsClient from "./polls-client";

export default async function Polls() {
  const { data: polls } = await supabase
    .from("polls")
    .select("*");

  const { data: options } = await supabase
    .from("options")
    .select("*");

  const pollsWithOptions =
    polls?.map((poll: any) => ({
      ...poll,
      options:
        options?.filter(
          (option: any) => option.poll_id === poll.id
        ) || [],
    })) || [];

  return (
    <PollsClient initialPolls={pollsWithOptions} />
  );
}