"use client";

import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <html lang="en">
        <body className={inter.className}>
          <>
            {children} <ToastContainer />
          </>
        </body>
      </html>
    </RecoilRoot>
  );
}
