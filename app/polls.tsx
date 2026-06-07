import { supabase } from "@/lib/supabase";

export default async function Polls() {
  const { data: polls } = await supabase
    .from("polls")
    .select("*");

  const { data: options } = await supabase
    .from("options")
    .select("*");

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        Live Polls
      </h1>

      {polls?.map((poll: any) => {
        const pollOptions =
          options?.filter(
            (option: any) => option.poll_id === poll.id
          ) || [];

        return (
          <div
            key={poll.id}
            className="border rounded-xl p-5 mb-5"
          >
            <h2 className="text-xl font-semibold mb-4">
              {poll.question}
            </h2>

            {pollOptions.map((option: any) => (
              <button
                key={option.id}
                className="w-full border rounded-lg p-3 mb-2 text-left"
              >
                {option.option_text}
              </button>
            ))}
          </div>
        );
      })}
    </>
  );
}