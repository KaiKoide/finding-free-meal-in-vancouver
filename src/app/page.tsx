import Image from 'next/image';

import { Header } from '@/components/ui/header';

export default function Home() {
	return (
		<div>
			<Header />
			<div className='relative'>
				<Image
					src='/images/top.webp'
					alt='map'
					width={1920}
					height={1080}
					className='min-h-screen object-cover'
				/>
				<div className='absolute inset-0 flex flex-col items-center justify-center text-white'>
					<h1 className='text-4xl font-bold mb-4'>
						Finding Free Meal in Vancouver
					</h1>
					<p className='text-2xl'>Discover Nearby Free or Low-Cost Meals!</p>
				</div>
			</div>
		</div>
	);
}
