import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "./lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yograj | Frontend Developer Portfolio",
  description: "Portfolio terminal interface built with Next.js",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className={cn("flex h-[100dvh] overflow-scroll w-full md:flex-row flex-col", inter.className)}>
          {children}
        </main>
      </body>
    </html>
  );
}
