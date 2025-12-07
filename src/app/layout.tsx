import './globals.css';
import 'dotenv/config';
import type { Metadata } from "next";
import GuesserNavBar from "../components/shared/guesser-navbar";
import { Providers } from "./providers";
import { Roboto } from "next/font/google";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.APP_URL ?? "https://pv-247-project-eight.vercel.app"),
	title: { default: "Movie Emoji Guesser", template: "%s | Movie Emoji Guesser" },
	description: "A simple game for guessing movies based on emojis.",
	alternates: {
		canonical: process.env.APP_URL ?? "https://pv-247-project-eight.vercel.app",
	},
	keywords: [
		"movie quiz",
		"emoji quiz",
		"movie guessing game",
		"film trivia",
		"emoji game",
	],
	openGraph: {
		title: "Movie Emoji Guesser",
		description: "A simple game for guessing movies based on emojis.",
		url: process.env.APP_URL ?? "https://pv-247-project-eight.vercel.app",
		siteName: "Movie Emoji Guesser",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.variable} style={{ margin: 0 }}>
			<Providers>
				<GuesserNavBar />
				{children}
			</Providers>
			</body>
		</html>
	);
}
