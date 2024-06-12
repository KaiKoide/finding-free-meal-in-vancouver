'use client';

import { useState, useRef, useEffect, type MouseEvent } from 'react';

import Map, {
	Marker,
	Popup,
	NavigationControl,
	GeolocateControl,
	Source,
	Layer,
	type MapRef,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MapPin, Bookmark } from 'lucide-react';

import classes from '@/app/Page.module.css';
import { fetchFoodProgramsData } from '@/libs/api';
import type FoodProgramsData from '@/types/foodProgramsData';
import AlertDestructive from './alertComponent';

interface SelectedMarker {
	foodProgram: FoodProgramsData;
	index: number;
}

export default function Test() {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
	const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(
		null,
	);
	const [foodProgramsData, setFoodProgramsData] = useState<FoodProgramsData[]>(
		[],
	);
	// Store route information
	const [route, setRoute] = useState(null);
	const [showAlert, setShowAlert] = useState(false);

	const mapRef = useRef<MapRef | null>(null);

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
			if (data.routes) setRoute(data.routes[0].geometry);
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
			});
		}
	};

	const handleClick = () => {
		console.log('clicked');
		setShowAlert(!showAlert);
	};

	// Called when 'Direction' is clicked in the popup, retrieves the current location, and calculates the route
	const handleDirectionClick = () => {
		if (selectedMarker && mapRef.current) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					const start = [longitude, latitude];
					const end = [
						selectedMarker.foodProgram.longitude,
						selectedMarker.foodProgram.latitude,
					];

					getRoute(start, end);
				},
				(error) => {
					console.error(error);
					switch (error.code) {
						case 1:
							console.error(error.code);
							setShowAlert(true);
							break;
						case 2: //POSITION_UNAVAILABLE
							alert('現在位置が取得できませんでした');
							break;
						case 3: //TIMEOUT
							alert('タイムアウトになりました');
							break;
						default:
							alert(`その他のエラー(エラーコード:${error.code})`);
							break;
					}
				},
			);
		}
	};

	return (
		<main>
			<p>test component</p>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				className='border p-3 bg-teal-500 text-white'
				onClick={handleClick}
			>
				Click me!!!
			</button>
			{showAlert && <AlertDestructive />}
		</main>
	);
}
