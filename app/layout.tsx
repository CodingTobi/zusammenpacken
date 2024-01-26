import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zusammenpacken",
  description: "Online Pack App",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex gap-1 h-screen w-full min-h-60 overflow-auto">
          <Sidebar className="w-16 bg-black h-full rounded-md" />
          <div className="flex flex-col gap-2 h-full w-full rounded-md bg-gray-500 min-w-52">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
