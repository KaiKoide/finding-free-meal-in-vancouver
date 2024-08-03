import { LoaderCircle } from 'lucide-react';

export const Loading = () => {
	return (
		<div className='flex justify-center items-center h-full'>
			<LoaderCircle className='animate-spin w-10 h-10 text-white' />
		</div>
	);
};
