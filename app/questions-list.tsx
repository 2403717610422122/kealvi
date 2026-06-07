"use client";

import { useState, useEffect } from "react";

export default function QuestionsList({
  initialQuestions,
  initialHasMore,
}: any) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(initialHasMore);

  // 🔍 SEARCH
  useEffect(() => {
    const controller = new AbortController();

    const id = setTimeout(async () => {
      try {
        const url = query
          ? `/api/questions?q=${encodeURIComponent(query)}`
          : `/api/questions`;

        const res = await fetch(url, {
          signal: controller.signal,
        });

        if (!res.ok) return;

        const data = await res.json();

        setQuestions(data.questions || []);
        setHasMore(data.hasMore ?? false);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      }
    }, 300);

    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [query]);

  // 🔼 UPVOTE
  async function upvote(id: string) {
    // optimistic UI update
    setQuestions((qs: any[]) =>
      qs.map((q) =>
        q.id === id
          ? { ...q, votes: (q.votes ?? 0) + 1 }
          : q
      )
    );

    try {
      await fetch(`/api/questions/${id}/vote`, {
        method: "POST",
      });
    } catch (err) {
      console.error("Vote error:", err);
    }
  }

  return (
    <div className="space-y-4 max-w-2xl mx-auto">

      {/* SEARCH BOX */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions..."
        className="w-full border rounded px-3 py-2"
      />

      {/* QUESTIONS LIST */}
      {questions.map((q: any) => (
        <div
          key={q.id}
          className="flex items-center justify-between gap-4 border p-3 rounded bg-white"
        >
          {/* LEFT: VOTE BUTTON */}
          <button
            onClick={() => upvote(q.id)}
            className="px-3 py-1 border rounded font-mono shrink-0 hover:bg-gray-100"
          >
            ▲ {q.votes ?? 0}
          </button>

          {/* RIGHT: QUESTION TEXT */}
          <div className="flex-1 text-left">
            {q.body}
          </div>
        </div>
      ))}

    </div>
  );
}