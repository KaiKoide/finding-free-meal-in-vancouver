import Image from 'next/image';

import { Header } from '@/components/ui/header';
import { auth } from '../../auth';
import { redirect } from 'next/navigation';
import { SignIn } from '@/components/ui/signinButton';

export default async function Home() {
	const session = await auth();
	// console.log('session', session);
	// if (!session?.user) {
	// 	redirect('/api/auth/signin?callbackUrl=/');
	// }

	return (
		<div>
			<Header />
			<SignIn />
			<Image
				src='/images/top.webp'
				alt='map'
				width={1920}
				height={1080}
				className='min-h-screen object-cover'
			/>
		</div>
	);
}
