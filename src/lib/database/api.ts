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

export async function addFavorite(
	id: number,
	name: string,
	lat: number,
	lon: number,
) {
	try {
		const newRecord = await prisma.favoriteList.create({
			data: {
				id,
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

export async function removeFavorite(id: number) {
	try {
		const deleteFavorite = await prisma.favoriteList.delete({
			where: {
				id: id,
			},
		});
		console.log('Deleting favorite successfully!', deleteFavorite);
	} catch (error) {
		console.error('Error removing data:', error);
	}
}
