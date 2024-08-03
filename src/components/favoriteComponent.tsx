'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Loading } from '@/components/ui/loading';
import { removeFavorite } from '@/lib/database/api';
import { cn } from '@/lib/utils';
import useFavoriteStore from '@/store/useFavoriteStore';
import useSelectedProgramStore from '@/store/useSelectedProgramStore';

const FavoriteContent = () => {
	const favoriteList = useFavoriteStore((state) => state.favoriteList);
	const fetchFavorites = useFavoriteStore((state) => state.fetchFavorite);
	const removeFavoriteFromStore = useFavoriteStore(
		(state) => state.removeFavoriteFromStore,
	);
	const [isLoading, setIsLoading] = useState(false);

	const setSelectedProgramId = useSelectedProgramStore(
		(state) => state.setSelectedProgramId,
	);

	useEffect(() => {
		async function loadFavorites() {
			setIsLoading(true);
			await fetchFavorites();
			setIsLoading(false);
		}
		loadFavorites();
	}, [fetchFavorites]);

	function handleRemoveClick(favoriteId: number) {
		try {
			if (favoriteList) {
				removeFavorite(favoriteId);
				removeFavoriteFromStore(favoriteId);
			}
		} catch (error) {
			console.error('Something wrong!');
		}
	}

	function handleSelectClick(favoriteId: number) {
		setSelectedProgramId(favoriteId);
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div
			className={cn('h-[90vh] pb-20', {
				'overflow-y-scroll': favoriteList.length > 0,
			})}
		>
			{favoriteList && favoriteList.length > 0 ? (
				favoriteList.map((favorite) => (
					<div key={favorite.id} className='flex flex-col gap-2 mb-5 '>
						<p>{favorite.name}</p>
						<div className='flex gap-3 justify-end'>
							<Button
								className='capitalize'
								onClick={() => handleSelectClick(favorite.id)}
							>
								select
							</Button>
							<Button
								variant='destructive'
								className='capitalize'
								onClick={() => handleRemoveClick(favorite.id)}
							>
								remove
							</Button>
						</div>
					</div>
				))
			) : (
				<p>There is no favorites</p>
			)}
		</div>
	);
};

export default FavoriteContent;
