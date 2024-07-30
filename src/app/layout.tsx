"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper";
import { Session } from "next-auth/core/types";
import MainLayout from "../../layouts/MainLayout";
const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
  session: Session;
}

export default function RootLayout({ children, session }: Props) {
  return (
    <SessionWrapper session={session}>
      <html lang="en">
        <body className={inter.className}>
          <MainLayout>{children}</MainLayout>
        </body>
      </html>
    </SessionWrapper>
  );
}
