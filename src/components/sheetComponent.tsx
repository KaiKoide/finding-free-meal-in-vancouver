'use client';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import type SelectedMarkerData from '@/types/SelectedMarkerData';

interface SheetComponentProps {
	selectedMarker: SelectedMarkerData | null;
}

export default function SheetComponent({
	selectedMarker,
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
					{/* <SheetDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</SheetDescription> */}
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
			</SheetContent>
		</Sheet>
	);
}
