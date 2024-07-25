import Image from 'next/image';

export default function Home() {
	return (
		<div>
			<div className='relative'>
				<Image
					src='/images/top.webp'
					alt='map'
					width={1920}
					height={1080}
					className='min-h-screen object-cover brightness-50'
				/>
				<div className='absolute inset-0 flex flex-col items-center justify-center text-white text-center'>
					<h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-4'>
						Finding Free Meal in Vancouver
					</h1>
					<h2 className='text-2xl md:text-3xl lg:text-4xl'>
						Discover Nearby Free or Low-Cost Meals!
					</h2>
				</div>
			</div>
		</div>
	);
}
