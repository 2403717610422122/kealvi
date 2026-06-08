"use client";

import { useState } from "react";

export default function PollsClient({
  initialPolls,
}: {
  initialPolls: any[];
}) {
  const [polls, setPolls] = useState(initialPolls);

  // 🔼 vote function (UNCHANGED)
  async function vote(pollId: string, optionId: string) {
    console.log("Voting:", { pollId, optionId });

    const res = await fetch("/api/polls/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pollId,
        optionId,
      }),
    });

    console.log("Response status:", res.status);

    if (res.ok) {
      // optimistic UI update
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
      console.error("Vote failed:", error);
    }
  }

  // 🧠 helper: get max votes per poll
  function getMaxVotes(options: any[]) {
    return Math.max(...options.map((o) => o.votes ?? 0));
  }

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold">Poll List</h2>

      {polls.map((poll) => {
        const maxVotes = getMaxVotes(poll.options);

        return (
          <div
            key={poll.id}
            className="rounded-lg border p-4 mb-4 bg-white"
          >
            {/* Poll Question */}
            <h3 className="font-semibold text-xl mb-3">
              {poll.question}
            </h3>

            {/* Options */}
            <div className="space-y-2">
              {poll.options.map((option: any) => {
                const isWinner =
                  option.votes === maxVotes && maxVotes > 0;

                return (
                  <button
                    key={option.id}
                    onClick={() => vote(poll.id, option.id)}
                    className={`block w-full rounded border p-2 text-left hover:bg-gray-100 transition ${
                      isWinner
                        ? "border-yellow-400 bg-yellow-50"
                        : ""
                    }`}
                  >
                    {option.option_text} (
                    {option.votes ?? 0} votes)

                    {/* 🏆 Winner badge */}
                    {isWinner && (
                      <span className="ml-2 text-xs font-bold text-yellow-600">
                        🏆 WINNER
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}