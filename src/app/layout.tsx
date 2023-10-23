import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chess",
  description: "Chess | next.js typescript tailwind xstate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-800 text-white">{children}</body>
    </html>
  );
}
