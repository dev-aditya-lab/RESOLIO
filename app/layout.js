import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resolvo - AI-Powered College Grievance Management",
  description: "Transform how your institution handles student complaints with AI-powered categorization, priority detection, and smart management.",
  keywords: "resolvo, grievance, complaint management, AI, college, education, student complaints",
  authors: [{ name: "Resolvo Team" }],
  openGraph: {
    title: "Resolvo - AI-Powered Grievance Management",
    description: "Transform how your institution handles student complaints with AI-powered categorization and priority detection.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
