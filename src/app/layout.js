import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/store-provider";
import { PersisterProvider } from "@/redux/persistor-provider";
import NavBar from "@/components/UI/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <PersisterProvider>
            <NavBar/>
            {children}
          </PersisterProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
