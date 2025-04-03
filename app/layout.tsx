import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Interview Agent",
  description: "AI-powered platform for interview preparation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ensure only dark mode to user-proof 3rd party resources
    <html lang="en" className="dark">
      <body className={`${monaSans.variable} antialiased`} >
        {children}
      </body>
    </html>
  );
}
