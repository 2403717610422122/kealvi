import { supabase } from "@/lib/supabase";

export default async function Polls() {
  const { data: polls, error } = await supabase
    .from("polls")
    .select("*");

  if (error) {
    return <p>Error loading polls</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Poll List</h2>

      {polls?.map((poll) => (
        <PollCard key={poll.poll_id} poll={poll} />
      ))}
    </div>
  );
}

async function PollCard({ poll }: any) {
  const { data: options } = await supabase
    .from("options")
    .select("*")
    .eq("poll_id", poll.poll_id);

  return (
    <div className="rounded-lg border p-4 mb-4">
      <h3 className="font-semibold">{poll.question}</h3>

      {options?.map((option: any) => (
        <button
          key={option.option_id}
          className="block w-full rounded border p-2 mt-2 text-left"
        >
          {option.option_text}
        </button>
      ))}
    </div>
  );
}