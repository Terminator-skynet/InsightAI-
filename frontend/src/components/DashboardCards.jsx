export default function DashboardCards({ data }) {
  if (!data) return null;

  const cards = [
    {
      title: "Rows",
      value: data.rows,
      color: "bg-blue-600",
      icon: "📄",
    },
    {
      title: "Columns",
      value: data.columns,
      color: "bg-green-600",
      icon: "📊",
    },
    {
      title: "Preview",
      value: data.preview.length,
      color: "bg-purple-600",
      icon: "👀",
    },
    {
      title: "Features",
      value: data.column_names.length,
      color: "bg-orange-600",
      icon: "📋",
    },
  ];

  return (
    <div className="mt-12">

      <h2 className="text-4xl font-bold text-white mb-8">
        📊 Analytics Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className={`${card.color} rounded-2xl p-6 shadow-xl hover:scale-105 transition duration-300`}
          >
            <div className="text-4xl">
              {card.icon}
            </div>

            <h3 className="text-5xl font-bold text-white mt-4">
              {card.value}
            </h3>

            <p className="text-white/80 mt-2">
              {card.title}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}