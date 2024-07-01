'use server';

import prisma from '../prisma';

export async function fetchFavoriteList() {
	try {
		const list = await prisma.favoriteList.findMany();
		console.log('list', list);

		return list;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}
