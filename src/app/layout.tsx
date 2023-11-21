import type { Metadata } from "next";
import "./globals.css";
import ClientStarter from "./ClientStarter";

export const metadata: Metadata = {
  title: "Fullstack Leetcode Clone",
  description: "Project to clone leetcode.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientStarter>{children}</ClientStarter>;
}
