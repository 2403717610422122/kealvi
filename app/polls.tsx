import { supabase } from "@/lib/supabase";

export default async function Polls() {
  const { data: polls, error } = await supabase
    .from("polls")
    .select("*");

  if (error) {
    return <p>Error loading polls</p>;
  }

  const pollsWithOptions = await Promise.all(
    polls.map(async (poll) => {
      const { data: options } = await supabase
        .from("options")
        .select("*")
        .eq("poll_id", poll.poll_id);

      return {
        ...poll,
        options: options || [],
      };
    })
  );

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Poll List</h2>

      {pollsWithOptions.map((poll) => (
        <div
          key={poll.poll_id}
          className="rounded-lg border p-4 mb-4"
        >
          <h3 className="font-semibold text-xl">
            {poll.question}
          </h3>

          {poll.options.map((option: any) => (
            <button
              key={option.option_id}
              className="block w-full rounded border p-2 mt-2 text-left"
            >
              {option.option_text}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}