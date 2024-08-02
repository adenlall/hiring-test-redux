import type { Metadata } from "next";
import { Inter } from "next/font/google";

import StoreProvider from "@/redux/store-provider";
import { PersisterProvider } from "@/redux/persistor-provider";

import "./globals.css";
import NavBar from "@/components/UI/NavBar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Janah Bilal - Hiring Test",
  description:
    "hiring test frontend project by janah bilal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <PersisterProvider>
            <Toaster/>
            <NavBar />
            {children}
          </PersisterProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
