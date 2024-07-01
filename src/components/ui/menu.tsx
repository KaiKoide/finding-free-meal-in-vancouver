'use client';
import { Menu } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import FavoriteContent from '../favoriteComponent';

export function MenuBar() {
	const [selectedItem, setSelectedItem] = useState<string | null>(null);

	const handleClick = (item: string) => {
		setSelectedItem(item);
	};

	return (
		<div className='p-5'>
			<Sheet>
				<SheetTrigger asChild>
					<Menu
						onClick={handleClick}
						className='cursor-pointer text-slate-500'
					/>
				</SheetTrigger>
				<SheetContent side='left'>
					<ul className='my-5'>
						<li className='uppercase'>top</li>
						<li className='uppercase'>map</li>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<li className='uppercase' onClick={() => handleClick('Favorite')}>
							favorite
						</li>
					</ul>
					<div className='content'>
						{selectedItem === 'Favorite' && <FavoriteContent />}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
}
