import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gamehub | by OBA",
  description: "Gamehub is a platform for playing games with your friends.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex shadow-sm z-10  top-0 sticky  bg-white  w-full justify-center items-center p-2">
          <div className="flex items-center ">
            <Link href="/" className="text-2xl  hover:text-black/70 font-semibold">
              Gamehub
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
