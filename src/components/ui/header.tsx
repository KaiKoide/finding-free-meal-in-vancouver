'use client';
import { Button } from './button';
import { MenuBar } from './menu';
import useSelectedProgramStore from '@/store/useSelectedProgramStore';
import useRouteStore from '@/store/useRouteStore';

export function Header() {
	const setSelectedProgramId = useSelectedProgramStore(
		(state) => state.setSelectedProgramId,
	);
	const { setRoute } = useRouteStore();

	function handleClick() {
		setSelectedProgramId(null);
		setRoute(null);
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
