export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-row justify-start items-start">
			{children}
		</div>
	);
}
