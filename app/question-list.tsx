"use client";

import { useState } from "react";

type Question = {
  id: string;
  body: string;
  author: string | null;
  votes: number;
};

export default function QuestionsList({
  initialQuestions,
}: {
  initialQuestions: Question[];
}) {
  const [questions, setQuestions] =
    useState(initialQuestions);

  async function upvote(id: string) {
    const voterId =
      localStorage.getItem("voterId") ??
      crypto.randomUUID();

    localStorage.setItem("voterId", voterId);

    const res = await fetch(
      `/api/questions/${id}/vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voterId }),
      }
    );

    if (!res.ok) {
      alert("You already voted");
      return;
    }

    setQuestions((qs) =>
      qs.map((q) =>
        q.id === id
          ? { ...q, votes: q.votes + 1 }
          : q
      )
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <div
          key={q.id}
          className="flex items-center justify-between border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
        >
          {/* Vote Button */}
          <button
            onClick={() => upvote(q.id)}
            className="flex flex-col items-center justify-center border rounded-lg px-4 py-2 hover:bg-gray-100 transition"
          >
            <span className="text-xl font-bold">▲</span>
            <span className="text-sm">{q.votes}</span>
          </button>

          {/* Question text */}
          <div className="flex-1 ml-4">
            <p className="text-lg font-medium">
              {q.body}
            </p>
            {q.author && (
              <p className="text-sm text-gray-500">
                {q.author}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}