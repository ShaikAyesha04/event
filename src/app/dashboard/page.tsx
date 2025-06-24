"use client";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [artists, setArtists] = useState<any[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("artists");
    if (stored) {
      setArtists(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = artists.filter((a) => a.id !== id);
    setArtists(updated);
    localStorage.setItem("artists", JSON.stringify(updated));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditData(artists[index]);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    const updated = [...artists];
    updated[editIndex!] = editData;
    setArtists(updated);
    localStorage.setItem("artists", JSON.stringify(updated));
    setEditIndex(null);
  };

  const downloadCSV = () => {
    const headers = ["Name", "Category", "Location", "Fee", "Languages"];
    const rows = artists.map((a) => [
      a.name,
      a.categories?.join("; "),
      a.location,
      a.feeRange,
      a.languages?.join("; "),
    ]);

    const csvContent = [headers, ...rows]
      .map((e) => e.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "artist_dashboard.csv";
    link.click();
  };

  return (
    <div className="min-h-screen p-8 bg-white dark:bg-black text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Manager Dashboard</h1>
        <button
          onClick={downloadCSV}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded"
        >
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">City</th>
              <th className="px-4 py-2 border">Fee</th>
              <th className="px-4 py-2 border">Languages</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist, idx) => (
              <tr key={idx} className="text-center border-t dark:border-gray-700">
                {editIndex === idx ? (
                  <>
                    <td className="px-2 py-1 border">
                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        className="w-full p-1 rounded"
                      />
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        name="categories"
                        value={editData.categories?.join(", ")}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            categories: e.target.value.split(","),
                          })
                        }
                        className="w-full p-1 rounded"
                      />
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        name="location"
                        value={editData.location}
                        onChange={handleEditChange}
                        className="w-full p-1 rounded"
                      />
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        name="feeRange"
                        value={editData.feeRange}
                        onChange={handleEditChange}
                        className="w-full p-1 rounded"
                      />
                    </td>
                    <td className="px-2 py-1 border">
                      <input
                        name="languages"
                        value={editData.languages?.join(", ")}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            languages: e.target.value.split(","),
                          })
                        }
                        className="w-full p-1 rounded"
                      />
                    </td>
                    <td className="px-2 py-1 border flex flex-col gap-2 items-center">
                      <button
                        onClick={saveEdit}
                        className="bg-green-600 px-2 py-1 text-white rounded text-xs"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditIndex(null)}
                        className="bg-gray-500 px-2 py-1 text-white rounded text-xs"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2 border">{artist.name}</td>
                    <td className="px-4 py-2 border">{artist.categories?.join(", ")}</td>
                    <td className="px-4 py-2 border">{artist.location}</td>
                    <td className="px-4 py-2 border">{artist.feeRange}</td>
                    <td className="px-4 py-2 border">{artist.languages?.join(", ")}</td>
                    <td className="px-4 py-2 border flex flex-col gap-2 items-center">
                      <button
                        onClick={() => handleEdit(idx)}
                        className="bg-pink-600 hover:bg-pink-700 px-3 py-1 rounded text-white text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(artist.id)}
                        className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
