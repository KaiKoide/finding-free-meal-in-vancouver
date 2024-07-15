import Image from 'next/image';

import MapComponent from '@/components/map';
import { Header } from '@/components/ui/header';

export default function Home() {
	return (
		<div>
			<Header />
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
