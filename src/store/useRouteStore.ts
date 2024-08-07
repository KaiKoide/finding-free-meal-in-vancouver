import { create } from 'zustand';
import type { Feature, LineString } from 'geojson';

interface RouteState {
	route: Feature<LineString> | null;
	setRoute: (route: Feature<LineString> | null) => void;
}
const useRouteStore = create<RouteState>((set) => ({
	route: null,
	setRoute: (route) => set({ route }),
}));

export default useRouteStore;
