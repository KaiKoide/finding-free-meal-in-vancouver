export default interface FoodProgramsData {
	program_name: string;
	description: string;
	program_status: string;
	organization_name: string;
	program_population_served: string | null;
	address_extra_info: string | null;
	location_address: string;
	local_areas: string;
	provides_meals: string;
	provides_hampers: string;
	delivery_available: string;
	takeout_available: string;
	wheelchair_accessible: string;
	meal_cost: string | null;
	hamper_cost: string | null;
	signup_required: string | null;
	signup_phone_number: string | null;
	signup_email: string | null;
	requires_referral: string;
	referral_agency_name: string | null;
	referral_phone_number: string | null;
	referral_email: string | null;
	latitude: number;
	longitude: number;
	last_update_date: string;
	geom: {
		lon: number;
		lat: number;
	};
}
