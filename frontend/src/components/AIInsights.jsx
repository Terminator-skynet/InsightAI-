import ReactMarkdown from "react-markdown";

export default function AIInsights({ data }) {
  if (!data || !data.ai_summary) return null;

  return (
    <div className="mt-12">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-6">
          🤖 AI Data Scientist Report
        </h2>

        <div className="bg-slate-900 rounded-xl p-6 text-gray-200">
          <ReactMarkdown>
            {data.ai_summary}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}