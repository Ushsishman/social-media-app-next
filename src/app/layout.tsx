"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../../components/SessionWrapper";
import { Session } from "next-auth/core/types";
import MainLayout from "../../layouts/MainLayout";
import store from "../../lib/store";
import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
  session: Session;
}

export default function RootLayout({ children, session }: Props) {
  {
    /* MAIN LAYOUT, ALSO AUTH AND REDUX WRAPPERS */
  }
  return (
    <SessionWrapper session={session}>
      <Provider store={store}>
        <html lang="en">
          <body className={inter.className}>
            <MainLayout>{children}</MainLayout>
          </body>
        </html>
      </Provider>
    </SessionWrapper>
  );
}
