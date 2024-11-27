import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { ConfigProvider } from "@/contexts/ConfigContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TestAI",
  description: "IA corretora de avaliações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-primary text-white p-3 tracking-widest">
          <Link href="/">
            <h1 className="">Test.AI</h1>
          </Link>
        </header>
        
        <ConfigProvider>
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
