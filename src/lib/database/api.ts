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

export async function addFavorite(name: string, lat: number, lon: number) {
	try {
		const newRecord = await prisma.favoriteList.create({
			data: {
				name,
				lat,
				lon,
			},
		});
		console.log('Adding new record successfully:', newRecord);
	} catch (error) {
		console.error('Error adding data:', error);
	}
}
