'use server';
export async function fetchFoodProgramsData() {
	try {
		const res = await fetch(
			'https://opendata.vancouver.ca/api/explore/v2.1/catalog/datasets/free-and-low-cost-food-programs/records?limit=83',
		);
		if (!res.ok) {
			throw new Error('Failed to fetch data');
		}

		return res.json();
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}
