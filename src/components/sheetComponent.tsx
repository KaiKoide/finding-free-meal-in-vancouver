'use client';
import { useEffect, useState } from 'react';
import { BookmarkMinus, BookmarkPlus } from 'lucide-react';

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { addFavorite } from '@/lib/database/api';
import useFavoriteStore from '@/store/useFavoriteStore';
import type SelectedMarkerData from '@/types/SelectedMarkerData';
import type FoodProgramsData from '@/types/foodProgramsData';

interface SheetComponentProps {
	selectedMarker: SelectedMarkerData | null;
	onChildClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function SheetComponent({
	selectedMarker,
	onChildClick,
}: SheetComponentProps) {
	const favoriteList = useFavoriteStore((state) => state.favoriteList);
	const fetchFavorites = useFavoriteStore((state) => state.fetchFavorite);

	useEffect(() => {
		fetchFavorites();
	}, [fetchFavorites]);

	function handleClick() {
		if (selectedMarker) {
			addFavorite(
				selectedMarker.foodProgram.program_name,
				selectedMarker.foodProgram.latitude,
				selectedMarker.foodProgram.longitude,
			);
			setFavoriteList((prev) => [...prev, selectedMarker]);
		}
	}

	console.log('favoriteList', favoriteList);

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
					<BookmarkMinus
						className='cursor-pointer bg-pink-400 text-pink-700 rounded-full h-9 w-9 p-1.5 border'
						onClick={handleClick}
					/>
				</div>
			</SheetContent>
		</Sheet>
	);
}
