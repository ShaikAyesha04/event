"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
<Head>
  <title>Explore Artists | Artistly</title>
  <meta name="description" content="Browse and book talented performers for your event." />
</Head>

export default function QuoteRequestsPage() {
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("quoteRequests");
    const parsed = stored ? JSON.parse(stored) : [];
    setQuotes(parsed);
  }, []);

  const removeQuote = (index: number) => {
    const updated = [...quotes];
    updated.splice(index, 1);
    setQuotes(updated);
    localStorage.setItem("quoteRequests", JSON.stringify(updated));
  };

  const downloadCSV = () => {
    const headers = ["Name", "Category", "Fee", "Location"];
    const rows = quotes.map((q) => [
      q.name,
      q.categories?.join(", "),
      q.feeRange,
      q.location,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "quote_requests.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Your Quote Requests</h1>
        {quotes.length > 0 && (
          <button
            onClick={downloadCSV}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
          >
            Download CSV
          </button>
        )}
      </div>

      {quotes.length === 0 ? (
        <p className="text-center text-gray-500">No quote requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Fee</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((artist, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border">{artist.name}</td>
                  <td className="px-4 py-2 border">{artist.categories?.join(", ")}</td>
                  <td className="px-4 py-2 border">{artist.feeRange}</td>
                  <td className="px-4 py-2 border">{artist.location}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => removeQuote(index)}
                      className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
