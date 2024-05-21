'use client';

import { useState, useRef, useEffect, type MouseEvent } from 'react';

import Map, {
	Marker,
	Popup,
	NavigationControl,
	GeolocateControl,
	type MapRef,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';
import { Bookmark } from 'lucide-react';

import classes from '@/app/Page.module.css';
import { fetchFoodProgramsData } from '@/libs/api';
import type FoodProgramsData from '@/types/foodProgramsData';

interface SelectedMarker {
	foodProgram: FoodProgramsData;
	index: number;
}

export default function Home() {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
	const [selectedMarker, setSelectedMarker] = useState<SelectedMarker | null>(
		null,
	);
	const [foodProgramsData, setFoodProgramsData] = useState<FoodProgramsData[]>(
		[],
	);
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

	console.log('foodProgramsData', foodProgramsData);

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
	};

	return (
		<main className={classes.mainStyle}>
			<Map
				ref={mapRef}
				mapboxAccessToken={mapboxToken}
				mapStyle='mapbox://styles/kaikoide/clw70yrjl028m01rj86ct7a7k'
				style={classes.mapStyle}
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
								{<MapPin size={30} color='tomato' />}
							</button>
						</Marker>
					);
				})}
				{selectedMarker ? (
					<Popup
						offset={25}
						latitude={selectedMarker.foodProgram.latitude}
						longitude={selectedMarker.foodProgram.longitude}
						onClose={() => {
							setSelectedMarker(null);
						}}
						closeButton={false}
					>
						{/* <Bookmark /> */}
						<h3 className={classes.popupTitle}>
							{selectedMarker.foodProgram.program_name}
						</h3>
						<div className={classes.popupInfo}>
							<label className={classes.popupLabel}>Description: </label>
							<span>{selectedMarker.foodProgram.description}</span>
							<br />
							<label className={classes.popupLabel}>Address: </label>
							<span>{selectedMarker.foodProgram.location_address}</span>
							<br />
							<button type='button' className='btn btn-primary'>
								Direction
							</button>
						</div>
					</Popup>
				) : null}
			</Map>
		</main>
	);
}
