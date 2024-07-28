import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';

import './globals.css';
import { roboto, darumadropOne } from '@/app/fonts';
import { Header } from '@/components/ui/header';
import { auth } from '../../auth';

export const metadata: Metadata = {
	title: 'Finding Free Meal in Vancouver',
	description: 'Top',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang='en'>
			<SessionProvider session={session}>
				<body className={`${roboto.variable} ${darumadropOne.variable}`}>
					<Header />
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}
