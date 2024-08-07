'use client';

import { useState, useRef, useEffect, type MouseEvent } from 'react';

import Map, {
	Marker,
	NavigationControl,
	GeolocateControl,
	Source,
	Layer,
	type MapRef,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { Feature, LineString } from 'geojson';
import { MapPin } from 'lucide-react';

import { Loading } from '@/components/ui/loading';
import { fetchFoodProgramsData } from '@/lib/foodPrograms/api';
import { cn } from '@/lib/utils';
import useSelectedProgramStore from '@/store/useSelectedProgramStore';
import useRouteStore from '@/store/useRouteStore';
import type FoodProgramsData from '@/types/foodProgramsData';
import type SelectedMarkerData from '@/types/SelectedMarkerData';

import SheetComponent from './sheetComponent';

export default function MapComponent() {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

	const [selectedMarker, setSelectedMarker] =
		useState<SelectedMarkerData | null>(null);
	const [foodProgramsData, setFoodProgramsData] = useState<FoodProgramsData[]>(
		[],
	);
	const [showAlert, setShowAlert] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const mapRef = useRef<MapRef | null>(null);

	const selectedProgramId = useSelectedProgramStore(
		(state) => state.selectedProgramId,
	);
	const { route, setRoute } = useRouteStore();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedData = await fetchFoodProgramsData();
				const results = fetchedData.results as FoodProgramsData[];
				if (results) setFoodProgramsData(results);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	// Get the route from the current location to the destination and update the route state
	const getRoute = async (start: number[], end: number[]) => {
		const directionUrl = `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxToken}`;

		try {
			const response = await fetch(directionUrl);
			const data = await response.json();
			if (data.routes?.[0].geometry) {
				const routeFeature: Feature<LineString> = {
					type: 'Feature',
					properties: {},
					geometry: data.routes[0].geometry,
				};
				setRoute(routeFeature);
			}
		} catch (error) {
			console.error('Error fetching route:', error);
		}
	};

	const zoomToSelectedLoc = (
		e: MouseEvent<HTMLButtonElement>,
		foodProgram: FoodProgramsData,
		index: number,
	) => {
		e.stopPropagation();
		setSelectedMarker({ foodProgram, index });
		if (mapRef.current) {
			mapRef.current.flyTo({
				center: [foodProgram.longitude, foodProgram.latitude],
				zoom: 13,
			});
		}
		document.getElementById('sheet-trigger')?.click();
	};

	// Called when 'Direction' is clicked in the popup, retrieves the current location, and calculates the route
	const handleDirectionClick = () => {
		if (selectedMarker && mapRef.current) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setIsLoading(true);
					const { latitude, longitude } = position.coords;
					const start = [longitude, latitude];
					const end = [
						selectedMarker.foodProgram.longitude,
						selectedMarker.foodProgram.latitude,
					];

					getRoute(start, end).finally(() => setIsLoading(false));
				},
				(error) => {
					console.error(error);
					switch (error.code) {
						// ACCESS DENIED
						case 1:
							alert('Access to location information was denied.');
							break;
						// POSITION_UNAVAILABLE
						case 2:
							alert('The current location could not be obtained.');
							break;
						//TIMEOUT
						case 3:
							alert('The request for location information timed out.');
							break;
						default:
							alert(`An unknown error occurred (Error code: ${error.code}).`);
							break;
					}
					setShowAlert(true);
					setIsLoading(false);
				},
			);
		}
	};

	return (
		<main className='max-w-full h-screen relative'>
			<Map
				ref={mapRef}
				mapboxAccessToken={mapboxToken}
				mapStyle='mapbox://styles/kaikoide/clw70yrjl028m01rj86ct7a7k'
				style={{ width: '100%', height: '100%' }}
				initialViewState={{
					latitude: 49.24966,
					longitude: -123.11934,
					zoom: 11,
				}}
				maxZoom={20}
				minZoom={3}
			>
				{/* Current location */}
				<GeolocateControl position='top-left' />
				<NavigationControl position='top-left' />
				{/* FoodPrograms Markers */}
				{foodProgramsData.map((foodProgram, index) => {
					return (
						<Marker
							key={index}
							longitude={foodProgram.longitude}
							latitude={foodProgram.latitude}
						>
							<button
								type='button'
								className='cursor-pointer'
								onClick={(e) => zoomToSelectedLoc(e, foodProgram, index)}
							>
								{
									<MapPin
										size={selectedProgramId === index ? 40 : 30}
										className={cn('stroke-cyan-500', {
											'stroke-red-400': selectedProgramId === index,
										})}
									/>
								}
							</button>
						</Marker>
					);
				})}
				{selectedMarker && (
					<SheetComponent
						onChildClick={handleDirectionClick}
						selectedMarker={selectedMarker}
					/>
				)}
				{/* Route */}
				{route && (
					<Source id='route' type='geojson' data={route}>
						<Layer
							id='route-layer'
							type='line'
							source='route'
							layout={{
								'line-join': 'round',
								'line-cap': 'round',
							}}
							paint={{
								'line-color': '#A78BFA',
								'line-width': 8,
							}}
						/>
					</Source>
				)}
			</Map>
			{isLoading && (
				<div className='absolute inset-0 flex items-center justify-center z-10 bg-black/50'>
					<Loading isWhite={true} />
				</div>
			)}
		</main>
	);
}
