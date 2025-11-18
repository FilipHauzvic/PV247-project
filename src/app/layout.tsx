import type { Metadata } from "next";
import GuesserNavBar from "../components/shared/guesser-navbar";
import { Providers } from "./providers";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Movie Emoji Guesser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Providers>
          <GuesserNavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
