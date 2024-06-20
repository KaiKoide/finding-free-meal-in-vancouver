'use client';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

export function MenuBar() {
	const handleClick = () => {
		console.log('clicked');
	};

	return (
		<div className='m-5'>
			<Sheet>
				<SheetTrigger asChild>
					<Menu
						onClick={handleClick}
						className='cursor-pointer text-slate-500'
					/>
				</SheetTrigger>
				<SheetContent side='left'>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						{/* <SheetDescription>
							Make changes to your profile here. Click save when you're done.
						</SheetDescription> */}
					</SheetHeader>
					<ul className='my-5'>
						<li className='uppercase'>top</li>
						<li className='uppercase'>map</li>
						<li className='uppercase'>favorite</li>
					</ul>
					<SheetFooter>
						<SheetClose asChild>
							<Button type='submit'>Save changes</Button>
						</SheetClose>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</div>
	);
}
