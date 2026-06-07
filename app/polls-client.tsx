"use client";

import { useState } from "react";

export default function PollsClient({
  initialPolls,
}: {
  initialPolls: any[];
}) {
  const [polls, setPolls] = useState(initialPolls);

  async function vote(optionId: number) {
    alert(`Voting for option ${optionId}`);

    const res = await fetch("/api/polls/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ optionId }),
    });

    alert(`Status: ${res.status}`);

    if (res.ok) {
      setPolls((current) =>
        current.map((poll) => ({
          ...poll,
          options: poll.options.map((option: any) =>
            option.id === optionId
              ? {
                  ...option,
                  votes: (option.votes ?? 0) + 1,
                }
              : option
          ),
        }))
      );
    } else {
      const error = await res.text();
      alert(`Error: ${error}`);
    }
  }

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Poll List</h2>

      {polls.map((poll) => (
        <div
          key={poll.id}
          className="rounded-lg border p-4 mb-4"
        >
          <h3 className="font-semibold text-xl mb-3">
            {poll.question}
          </h3>

          {poll.options.map((option: any) => (
            <button
              key={option.id}
              onClick={() => vote(option.id)}
              className="block w-full rounded border p-2 mt-2 text-left hover:bg-gray-100"
            >
              {option.option_text} ({option.votes ?? 0} votes)
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}