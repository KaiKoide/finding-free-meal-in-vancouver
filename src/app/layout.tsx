import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';

import './globals.css';
import { Header } from '@/components/ui/header';
import { auth } from '../../auth';

export const metadata: Metadata = {
	title: 'Finding Free Meal in Vancouver',
	description: 'Top',
};

const roboto = Roboto({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-roboto',
	display: 'swap',
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang='en'>
			<SessionProvider session={session}>
				<body className={roboto.className}>
					<Header />
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}
