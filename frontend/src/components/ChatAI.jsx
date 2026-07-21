import { useState } from "react";
import axios from "axios";

export default function ChatAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          question: question,
        }
      );

      setAnswer(response.data.answer);

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Failed to contact AI."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-slate-800 rounded-2xl p-8 shadow-xl">

      <h2 className="text-3xl font-bold text-white mb-6">
        🤖 Chat with your Dataset
      </h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything about your dataset..."
        className="w-full h-32 rounded-xl bg-slate-900 text-white p-4 border border-slate-700 focus:outline-none focus:border-blue-500"
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl text-white font-semibold"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-8 bg-slate-900 rounded-xl p-6 text-gray-200 whitespace-pre-wrap">
          {answer}
        </div>
      )}

    </div>
  );
}