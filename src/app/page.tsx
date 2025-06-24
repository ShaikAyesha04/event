'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Head from "next/head";
<Head>
  <title>Explore Artists | Artistly</title>
  <meta name="description" content="Browse and book talented performers for your event." />
</Head>

export default function Home() {
  const router = useRouter();

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <Image
          src="/hero.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book Talented Artists</h2>
          <p className="text-lg md:text-xl mb-6">Connect with performers for your dream event.</p>

          {/* Role Toggle Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => router.push('/artists')}
              className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full text-white font-semibold shadow-md transition"
            >
              Event Planner View----Artists+My quotes
            </button>
            <button
              onClick={() => router.push('/onboard')}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full text-white font-semibold shadow-md transition"
            >
              Artist Manager View----Onboard+Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Artist Categories */}
      <section className="py-16 px-6 bg-white dark:bg-black text-gray-800 dark:text-white">
        <h3 className="text-3xl font-bold text-center mb-10">Artist Categories</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { title: "Singers", img: "/singers.jpg" },
            { title: "Dancers", img: "/dancers.jpg" },
            { title: "DJs", img: "/dj.jpg" },
            { title: "Speakers", img: "/speaker.jpg" },
          ].map((artist, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-pink-200 transition-transform duration-300"
            >
              <Image
                src={artist.img}
                alt={artist.title}
                width={400}
                height={250}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-pink-600 text-center">{artist.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
