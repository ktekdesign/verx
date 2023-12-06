import { Inter } from "next/font/google";
import "./globals.css";
import AppProvider from "./providers";
import AppNavbar from "../components/app-navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <AppNavbar />
          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
