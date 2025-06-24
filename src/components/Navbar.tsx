"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-4 py-2 flex justify-between items-center bg-white/10 backdrop-blur-md border-b border-white/30 text-white shadow-sm">
      <Image
        src="/logo.svg"
        alt="Artistly Logo"
        width={70}
        height={60}
        className="object-contain transition-transform duration-300 hover:scale-110"
      />
  
      <div className="flex gap-4 items-center">
        <a
          href="/"
          className="transition-all duration-200 text-white hover:text-pink-500 hover:text-xl"
        >
          Home
        </a>
        <a
          href="/artists"
          className="transition-all duration-200 text-white hover:text-pink-500 hover:text-xl"
        >
          Artists
        </a>
        <a
          href="/onboard"
          className="transition-all duration-200 text-white hover:text-pink-500 hover:text-xl"
        >
          Onboard
        </a>
        <a href="/dashboard" className="hover:text-pink-500 transition hover:text-xl">Dashboard</a>
    <a href="/quote-requests" className="hover:text-pink-500 transition hover:text-xl">My Quotes</a>

      </div>
    </nav>
  );
}
