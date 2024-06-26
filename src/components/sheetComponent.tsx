'use client';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import type SelectedMarkerData from '@/types/SelectedMarkerData';

interface SheetComponentProps {
	selectedMarker: SelectedMarkerData | null;
	onChildClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SheetComponent({
	selectedMarker,
	onChildClick,
}: SheetComponentProps) {
	console.log('selectedMarker', selectedMarker);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button type='button' id='sheet-trigger'>
					Open
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{selectedMarker?.foodProgram.program_name}</SheetTitle>
				</SheetHeader>
				<div>
					<h2 className='font-bold capitalize mt-5'>description</h2>
					<p>{selectedMarker?.foodProgram.description}</p>
					<h2 className='font-bold capitalize mt-5'>address</h2>
					<p>{selectedMarker?.foodProgram.location_address}</p>
					{selectedMarker?.foodProgram.address_extra_info && (
						<p>{selectedMarker?.foodProgram.address_extra_info}</p>
					)}
					{selectedMarker?.foodProgram.program_population_served && (
						<>
							<h2 className='font-bold capitalize mt-5'>target group</h2>
							<p>{selectedMarker?.foodProgram.program_population_served}</p>
						</>
					)}
					{selectedMarker?.foodProgram.meal_cost && (
						<>
							<h2 className='font-bold capitalize mt-5'>meal cost</h2>
							<p>{selectedMarker?.foodProgram.meal_cost}</p>
						</>
					)}
				</div>
				<Button onClick={onChildClick} className='mt-5'>
					get direction
				</Button>
			</SheetContent>
		</Sheet>
	);
}
