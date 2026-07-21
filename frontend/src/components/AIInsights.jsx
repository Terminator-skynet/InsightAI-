export default function AIInsights({ data }) {
  if (!data) return null;

  const insights = [];

  // Dataset size
  if (data.rows > 10000) {
    insights.push("Large dataset detected. Suitable for Machine Learning.");
  } else {
    insights.push("Small dataset. Great for quick analysis.");
  }

  // Missing values
  if (data.missing_values === 0) {
    insights.push("No missing values found.");
  } else {
    insights.push(
      `${data.missing_values} missing values detected. Cleaning is recommended.`
    );
  }

  // Duplicate rows
  if (data.duplicate_rows === 0) {
    insights.push("No duplicate rows detected.");
  } else {
    insights.push(
      `${data.duplicate_rows} duplicate rows detected.`
    );
  }

  // Numeric columns
  if (data.numeric_columns >= 3) {
    insights.push(
      "Dataset contains multiple numerical features suitable for visualizations and ML."
    );
  }

  // Memory usage
  insights.push(
    `Dataset occupies approximately ${data.memory_usage} MB in memory.`
  );

  return (
    <div className="mt-12">

      {/* AI Insights */}

      <div className="bg-slate-800 rounded-2xl p-8 shadow-xl">

        <h2 className="text-3xl font-bold text-white mb-6">
          🤖 AI Insights
        </h2>

        <div className="space-y-4">
          {insights.map((item, index) => (
            <div
              key={index}
              className="bg-slate-700 rounded-lg p-4 text-gray-200"
            >
              ✅ {item}
            </div>
          ))}
        </div>

      </div>

      {/* Business Recommendations */}

      <div className="bg-slate-800 rounded-2xl p-8 shadow-xl mt-8">

        <h2 className="text-3xl font-bold text-white mb-6">
          💡 Business Recommendations
        </h2>

        <div className="space-y-4">

          <div className="bg-slate-700 rounded-lg p-4 text-gray-200">
            📊 Build predictive models using this dataset.
          </div>

          <div className="bg-slate-700 rounded-lg p-4 text-gray-200">
            📈 Create dashboards to monitor important trends.
          </div>

          <div className="bg-slate-700 rounded-lg p-4 text-gray-200">
            🎯 Focus on the most important numerical features for deeper analysis.
          </div>

          <div className="bg-slate-700 rounded-lg p-4 text-gray-200">
            🚀 Dataset is suitable for AI-powered insights and forecasting.
          </div>

        </div>

      </div>

    </div>
  );
}