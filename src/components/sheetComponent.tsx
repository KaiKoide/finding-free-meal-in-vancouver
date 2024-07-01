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
import { BookmarkPlus } from 'lucide-react';
import { addFavorite } from '@/lib/database/api';

interface SheetComponentProps {
	selectedMarker: SelectedMarkerData | null;
	onChildClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SheetComponent({
	selectedMarker,
	onChildClick,
}: SheetComponentProps) {
	console.log('selectedMarker', selectedMarker);

	function handleClick() {
		addFavorite(
			selectedMarker?.foodProgram.program_name as string,
			selectedMarker?.foodProgram.latitude as number,
			selectedMarker?.foodProgram.longitude as number,
		);
	}

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
				<div className='flex items-center mt-5 gap-5'>
					<Button onClick={onChildClick}>get direction</Button>
					<BookmarkPlus className='cursor-pointer' onClick={handleClick} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
