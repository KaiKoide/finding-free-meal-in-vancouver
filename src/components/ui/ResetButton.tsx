'use client';
import { Button } from './button';
import useSelectedProgramStore from '@/store/useSelectedProgramStore';
import useRouteStore from '@/store/useRouteStore';

export default function ResetButton() {
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
		<>
			{(route !== null || selectedProgramId !== null) && (
				<Button className='capitalize' onClick={handleClick}>
					reset
				</Button>
			)}
		</>
	);
}
