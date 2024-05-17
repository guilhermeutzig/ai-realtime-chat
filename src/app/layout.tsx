import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "AI Real-time Chat",
  description:
    "AI Real-time Chat is an interactive platform allowing users to create accounts, join chat rooms, and engage in real-time messaging with robust user authentication and message history features.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-inter ${inter.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
