'use client';
import { Button } from './button';
import { MenuBar } from './menu';
import useSelectedProgramStore from '@/store/useSelectedProgramStore';
import useRouteStore from '@/store/useRouteStore';

export function Header() {
	const selectedProgramId = useSelectedProgramStore(
		(state) => state.selectedProgramId,
	);
	const setSelectedProgramId = useSelectedProgramStore(
		(state) => state.setSelectedProgramId,
	);
	const { route, setRoute } = useRouteStore();

	function handleClick() {
		setSelectedProgramId(null);
		setRoute(null);
	}

	return (
		<div className='bg-gray-100 flex items-center'>
			<MenuBar />
			{(route !== null || selectedProgramId !== null) && (
				<Button className='capitalize' onClick={handleClick}>
					reset
				</Button>
			)}
		</div>
	);
}
