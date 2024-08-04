import { LoaderCircle } from 'lucide-react';

import { cn } from '@/lib/utils';

export const Loading = ({ isWhite }: { isWhite: boolean }) => {
	return (
		<div className='flex justify-center items-center h-full'>
			<LoaderCircle
				className={cn(
					'animate-spin w-10 h-10',
					isWhite === true && 'text-white',
				)}
			/>
		</div>
	);
};
