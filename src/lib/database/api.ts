'use server';

import prisma from '../prisma';

import { auth } from '../../../auth';

export async function fetchFavoriteList() {
	try {
		const session = await auth();

		const list = await prisma.favoriteList.findMany({
			where: {
				userId: session?.user?.id,
			},
		});

		return list;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

export async function addFavorite(
	name: string,
	lat: number,
	lon: number,
	userId: string,
) {
	try {
		const newRecord = await prisma.favoriteList.create({
			data: {
				name,
				lat,
				lon,
				userId,
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
