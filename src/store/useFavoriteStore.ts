import { create } from 'zustand';

import { fetchFavoriteList } from '@/lib/database/api';
import type FavoriteListData from '@/types/favoriteListData';

interface FavoriteState {
	favoriteList: FavoriteListData[];
	fetchFavorite: () => Promise<void>;
}

const useFavoriteStore = create<FavoriteState>((set) => ({
	favoriteList: [],
	fetchFavorite: async () => {
		try {
			const data = await fetchFavoriteList();
			if (data) set({ favoriteList: await data });
		} catch (error) {
			console.error('Error fetching data', error);
		}
	},
}));

export default useFavoriteStore;
