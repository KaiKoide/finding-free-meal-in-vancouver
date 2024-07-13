'use client';
import { Button } from './button';
import { MenuBar } from './menu';
import useSelectedProgramStore from '@/store/useSelectedProgramStore';

export function Header() {
	const setSelectedProgramId = useSelectedProgramStore(
		(state) => state.setSelectedProgramId,
	);

	function handleClick() {
		setSelectedProgramId(null);
	}

	return (
		<div className='bg-gray-100 flex items-center'>
			<MenuBar />
			<Button className='capitalize' onClick={handleClick}>
				reset
			</Button>
		</div>
	);
}
