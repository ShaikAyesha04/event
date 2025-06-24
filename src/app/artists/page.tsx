"use client";

import { useEffect, useState } from "react";
import { artists as predefinedArtists } from "@/artists"; // Make sure this path is correct

export default function ArtistsPage() {
  const [artistList, setArtistList] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Get new artists from localStorage
    const stored = localStorage.getItem("artists");
    const newArtists = stored ? JSON.parse(stored) : [];

    // Normalize predefined data
    const normalizedPredefined = predefinedArtists.map((artist) => ({
      ...artist,
      categories: [artist.category], // Make string to array
      feeRange: artist.price,
      
    }));

    const combined = [...normalizedPredefined, ...newArtists];
    setArtistList(combined);
  }, []);

  // Filter artists by category
  const filteredArtists =
    selectedCategory === ""
      ? artistList
      : artistList.filter((artist) =>
          artist.categories?.includes(selectedCategory)
        );

  return (
    <div className="min-h-screen p-6 bg-white dark:bg-black text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">Explore Artists</h1>

      {/* Filter Dropdown */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          <option value="">All Categories</option>
          <option value="Singer">Singer</option>
          <option value="Dancer">Dancer</option>
          <option value="DJ">DJ</option>
          <option value="Speaker">Speaker</option>
        </select>
      </div>

      {/* Artist Grid */}
      {filteredArtists.length === 0 ? (
        <p className="text-center text-gray-500">No artists found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredArtists.map((artist, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex flex-col gap-2"
            >
              <div className="text-xl font-semibold text-pink-600">{artist.name}</div>
              <div><strong>Category:</strong> {artist.categories?.join(", ")}</div>
              <div><strong>Fee:</strong> {artist.feeRange}</div>
              <div><strong>Location:</strong> {artist.location}</div>
              {artist.languages?.length > 0 && (
                <div><strong>Languages:</strong> {artist.languages.join(", ")}</div>
              )}
              <button
  onClick={() => {
    const stored = localStorage.getItem("quoteRequests");
    const quoteRequests = stored ? JSON.parse(stored) : [];

    const alreadyAdded = quoteRequests.some(
      (q: any) => q.name === artist.name && q.location === artist.location
    );

    if (alreadyAdded) {
      alert("You already requested a quote from this artist.");
      return;
    }

    const updated = [...quoteRequests, artist];
    localStorage.setItem("quoteRequests", JSON.stringify(updated));
    alert("Quote request sent!");
  }}
  className="mt-2 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
>
  Ask for Quote
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
