import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#F97316",
  "#14B8A6",
];

export default function Charts({ data }) {
  if (!data || !data.chart_data) return null;

  const pieData = data.chart_data.data_types;
  const barData = data.chart_data.missing_values;

  return (
    <div className="mt-12">

      <h2 className="text-3xl font-bold text-white mb-8">
        📊 Visual Analytics
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Missing Values Bar Chart */}

        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">

          <h3 className="text-xl font-bold text-white mb-5">
            Missing Values by Column
          </h3>

          <ResponsiveContainer width="100%" height={350}>

            <BarChart data={barData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="name"
                angle={-25}
                textAnchor="end"
                interval={0}
                height={80}
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#3B82F6"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}

        <div className="bg-slate-800 rounded-2xl p-6 shadow-xl">

          <h3 className="text-xl font-bold text-white mb-5">
            Data Type Distribution
          </h3>

          <ResponsiveContainer width="100%" height={350}>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >

                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}