'use client';

import { useEffect, useState } from 'react';

import { fetchFavoriteList } from '@/lib/database/api';
import type FavoriteListData from '@/types/favoriteListData';

const FavoriteContent = () => {
	const [favoriteList, setFavoriteList] = useState<FavoriteListData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedData = await fetchFavoriteList();
				if (fetchedData) setFavoriteList(fetchedData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			{favoriteList.map((favorite) => (
				<p key={favorite.id}>{favorite.name}</p>
			))}
		</div>
	);
};

export default FavoriteContent;
