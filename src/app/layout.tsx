import type { Metadata } from 'next';

import './globals.css';
import { roboto, darumadropOne } from '@/app/fonts';
import { Header } from '@/components/ui/header';

export const metadata: Metadata = {
	title: 'Finding Free Meal in Vancouver',
	description: 'You can search free or low-cost meals in Vancouver.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.variable} ${darumadropOne.variable}`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
