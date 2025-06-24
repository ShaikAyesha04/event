"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const categories = ["Singer", "Dancer", "DJ", "Speaker"];
const languages = ["English", "Hindi", "Telugu", "Tamil"];
const feeOptions = ["₹5,000 - ₹10,000", "₹10,000 - ₹25,000", "₹25,000+"];

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    bio: yup.string().required("Bio is required"),
    categories: yup.array().min(1, "Select at least one category"),
    languages: yup.array().min(1, "Select at least one language"),
    feeRange: yup.string().required("Fee range is required"),
    location: yup.string().required("Location is required"),
  })
  .required();

export default function OnboardPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categories: [],
      languages: [],
    },
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);

  const onSubmit = (data: any) => {
    const newArtist = {
      id: Date.now(),
      ...data,
      profileImage: profileImage ? profileImage.name : null,
    };

    const existing = JSON.parse(localStorage.getItem("artists") || "[]");
    const updated = [...existing, newArtist];
    localStorage.setItem("artists", JSON.stringify(updated));

    alert("✅ Artist submitted and saved to Dashboard!");
    reset();
    setProfileImage(null);
  };

  return (
    <div className="min-h-screen py-12 px-6 bg-gray-100 dark:bg-black text-gray-800 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 space-y-6">
        <h1 className="text-4xl font-bold text-center text-pink-600">Artist Onboarding</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              {...register("name")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="Enter artist name"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Bio */}
          <div>
            <label className="block font-semibold mb-1">Bio</label>
            <textarea
              {...register("bio")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="Write a short artist bio"
              rows={4}
            />
            <p className="text-red-500 text-sm">{errors.bio?.message}</p>
          </div>

          {/* Categories */}
          <div>
            <label className="block font-semibold mb-1">Categories</label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input type="checkbox" value={cat} {...register("categories")} />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
            <p className="text-red-500 text-sm">{errors.categories?.message}</p>
          </div>

          {/* Languages */}
          <div>
            <label className="block font-semibold mb-1">Languages Spoken</label>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <label key={lang} className="flex items-center gap-2">
                  <input type="checkbox" value={lang} {...register("languages")} />
                  <span>{lang}</span>
                </label>
              ))}
            </div>
            <p className="text-red-500 text-sm">{errors.languages?.message}</p>
          </div>

          {/* Fee Range */}
          <div>
            <label className="block font-semibold mb-1">Fee Range</label>
            <select
              {...register("feeRange")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            >
              <option value="">Select fee</option>
              {feeOptions.map((fee) => (
                <option key={fee} value={fee}>
                  {fee}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-sm">{errors.feeRange?.message}</p>
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              {...register("location")}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              placeholder="Enter city or region"
            />
            <p className="text-red-500 text-sm">{errors.location?.message}</p>
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold transition"
          >
            Submit Artist
          </button>
        </form>
      </div>
    </div>
  );
}
