import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Shabi Haidar Rizvi — Full-Stack · AI · DevOps",
  description:
    "Shabi Haidar Rizvi's portfolio — building across AI, full-stack applications, developer tools, and infrastructure.",
  applicationName: "Shabi Haidar Rizvi",
  openGraph: {
    title: "Shabi Haidar Rizvi — Full-Stack · AI · DevOps",
    description:
      "Shabi Haidar Rizvi's portfolio — building across AI, full-stack applications, developer tools, and infrastructure.",
    type: "website",
    siteName: "Shabi Haidar Rizvi",
  },
  twitter: {
    card: "summary",
    title: "Shabi Haidar Rizvi — Full-Stack · AI · DevOps",
    description:
      "Shabi Haidar Rizvi's portfolio — building across AI, full-stack applications, developer tools, and infrastructure.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
