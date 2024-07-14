import { create } from 'zustand';

interface RouteState {
	route: {
		type: string;
		coordinates: number[][];
	} | null;
	setRoute: (route: { type: string; coordinates: number[][] }) => void;
}
const useRouteStore = create<RouteState>((set) => ({
	route: null,
	setRoute: (route) => set({ route }),
}));

export default useRouteStore;
