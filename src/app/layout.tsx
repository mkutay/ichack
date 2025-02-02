import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "@/app/globals.css";
// import NavBar from "@/components/navBar";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MAKE DECISIONS",
  description: "Make decisions with Claude AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} antialiased flex flex-col min-h-screen bg-bg text-text`}
      >
        {/* <NavBar/> */}
        {children}
      </body>
    </html>
  );
}
