export default function DataPreview({ data }) {
  if (!data) return null;

  return (
    <div className="bg-slate-800 rounded-2xl p-8 mt-12 shadow-xl overflow-x-auto">

      <h2 className="text-3xl font-bold text-white mb-6">
        📋 Dataset Preview
      </h2>

      <table className="min-w-full">

        <thead>

          <tr className="bg-slate-700">

            {data.column_names.map((column) => (

              <th
                key={column}
                className="px-5 py-3 border border-slate-600 text-left text-white"
              >
                {column}
              </th>

            ))}

          </tr>

        </thead>

        <tbody>

          {data.preview.map((row, index) => (

            <tr
              key={index}
              className="hover:bg-slate-700"
            >

              {data.column_names.map((column) => (

                <td
                  key={column}
                  className="px-5 py-3 border border-slate-700 text-gray-300"
                >
                  {String(row[column])}
                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}