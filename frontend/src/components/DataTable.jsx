import { useMemo, useState } from "react";

export default function DataTable({ data }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  if (!data) return null;

  const rowsPerPage = 5;

  const filteredRows = useMemo(() => {
    return data.preview.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data.preview]);

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const currentRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="mt-12 bg-slate-800 rounded-2xl p-8 shadow-xl">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-3xl font-bold text-white">
          📋 Dataset Preview
        </h2>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg outline-none"
        />

      </div>

      <div className="text-gray-400 mb-4">
        Showing {currentRows.length} of {filteredRows.length} preview rows
      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="bg-slate-700">

              {data.column_names.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-white border border-slate-600"
                >
                  {col}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {currentRows.map((row, index) => (

              <tr
                key={index}
                className="hover:bg-slate-700"
              >

                {data.column_names.map((col) => (

                  <td
                    key={col}
                    className="px-4 py-3 border border-slate-700 text-gray-300"
                  >
                    {String(row[col])}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex justify-between mt-6">

        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-blue-600 px-4 py-2 rounded text-white disabled:bg-gray-600"
        >
          Previous
        </button>

        <span className="text-white">
          Page {page} / {totalPages || 1}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages || totalPages === 0}
          className="bg-blue-600 px-4 py-2 rounded text-white disabled:bg-gray-600"
        >
          Next
        </button>

      </div>

    </div>
  );
}