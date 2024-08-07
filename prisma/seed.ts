import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
	const favorite = await prisma.favoriteList.create({
		data: {
			name: 'test',
			lat: 49.28967576079232,
			lon: -123.13857731195915,
		},
	});
}

seed()
	.then(() => {
		prisma.$disconnect();
		process.exit(0);
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
