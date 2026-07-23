import { useState } from "react";
import axios from "axios";
import DashboardCards from "./DashboardCards";
import DataPreview from "./DataPreview";
import Charts from "./Charts";
import AIInsights from "./AIInsights";
import DataTable from "./DataTable";
import ChatAI from "./ChatAI";

export default function UploadBox() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Select CSV file
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setData(null);
  };

  // Upload CSV to backend
  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please choose a CSV file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);

      const response = await axios.post(
        "https://insightai-0s5z.onrender.com/upload",
        formData
      );

      setData(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {/* Upload Card */}

      <div className="bg-slate-800 border-2 border-dashed border-blue-500 rounded-3xl p-12 shadow-xl">

        <h1 className="text-4xl font-bold text-center text-white">
          Upload Dataset
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Upload a CSV file and let InsightAI analyze your data.
        </p>

        <div className="flex flex-col items-center gap-5 mt-10">

          <label className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-xl text-white font-semibold cursor-pointer">

            Choose CSV

            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />

          </label>

          {selectedFile && (
            <p className="text-green-400 font-medium">
              📄 {selectedFile.name}
            </p>
          )}

          <button
            onClick={uploadFile}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 transition px-8 py-3 rounded-xl text-white font-semibold disabled:bg-gray-500"
          >
            {loading ? "Uploading..." : "Upload Dataset"}
          </button>

        </div>

      </div>

      {/* Dashboard Components */}

      {data && (
        <>
          <DashboardCards data={data} />
          <Charts data={data} />
          <AIInsights data={data} />
          <ChatAI data={data} />
          <DataTable data={data} />
        </>
      )}

    </div>
  );
}