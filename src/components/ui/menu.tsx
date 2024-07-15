'use client';
import Link from 'next/link';
import { Menu } from 'lucide-react';

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
					<Menu className='cursor-pointer text-slate-500' />
				</SheetTrigger>
				<SheetContent side='left'>
					<ul className='my-5'>
						<Link href='/'>
							<li className='uppercase cursor-pointer'>top</li>
						</Link>
						<Link href='/map'>
							<li className='uppercase cursor-pointer'>map</li>
						</Link>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<li
							className='uppercase cursor-pointer'
							onClick={() => handleClick('Favorite')}
						>
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
