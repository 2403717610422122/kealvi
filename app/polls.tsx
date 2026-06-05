import { supabase } from "@/lib/supabase";

export default async function Polls() {
  const { data: polls } = await supabase
    .from("polls")
    .select("*");

  const { data: options } = await supabase
    .from("options")
    .select("*");

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Poll List</h2>

      {polls?.map((poll: any) => {
        const pollOptions =
          options?.filter(
            (option: any) => option.poll_id === poll.poll_id
          ) || [];

        return (
          <div
            key={poll.poll_id}
            className="rounded-lg border p-4 mb-4"
          >
            <h3 className="font-semibold text-xl">
              {poll.question}
            </h3>

            {pollOptions.map((option: any) => (
              <button
                key={option.id}
                className="block w-full rounded border p-2 mt-2 text-left"
              >
                {option.option_text}
              </button>
            ))}
          </div>
        );
      })}
    </div>
  );
}