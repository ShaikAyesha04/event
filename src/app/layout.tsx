import "../styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Artistly.com",
  description: "Book talented artists for events",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 dark:bg-black dark:text-white transition-colors duration-300">
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
