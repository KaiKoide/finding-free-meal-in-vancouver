'use client';

import { useEffect, useState } from 'react';

import { fetchFavoriteList } from '@/lib/database/api';
import type FavoriteListData from '@/types/favoriteListData';
import useFavoriteStore from '@/store/useFavoriteStore';

const FavoriteContent = () => {
	const favoriteList = useFavoriteStore((state) => state.favoriteList);
	const fetchFavorites = useFavoriteStore((state) => state.fetchFavorite);

	useEffect(() => {
		fetchFavorites();
	}, [fetchFavorites]);

	console.log('favoriteList', favoriteList);

	return (
		<div>
			{favoriteList.map((favorite) => (
				<p key={favorite.id}>{favorite.name}</p>
			))}
		</div>
	);
};

export default FavoriteContent;
