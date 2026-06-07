import { getQuestionsPage } from "@/lib/questions";
import QuestionsList from "./question-list";

export default async function Home() {
  const { questions } =
    await getQuestionsPage(0, 20);

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2">
        Live Q&A
      </h1>

      <p className="text-gray-500 mb-6">
        Interactive ✓
      </p>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Ask a question..."
          className="flex-1 border rounded-lg p-3"
        />
        <button className="border rounded-lg px-6">
          Ask
        </button>
      </div>

      <input
        placeholder="Search questions..."
        className="w-full border rounded-lg p-3 mb-6"
      />

      <QuestionsList
        initialQuestions={questions}
      />
    </main>
  );
}