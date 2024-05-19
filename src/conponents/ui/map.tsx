'use client';

import { useState, useRef, useEffect } from 'react';

import Map, {
	Marker,
	Popup,
	NavigationControl,
	GeolocateControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

import classes from '@/app/Page.module.css';
import { fetchFoodProgramsData } from '@/libs/api';
import type FoodProgramsData from '@/types/foodProgramsData';

export default function Home() {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
	const [selectedMarker, setSelectedMarker] = useState(null);
	const [foodProgramsData, setFoodProgramsData] = useState([]);
	const mapRef = useRef(null);

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

	const zoomToSelectedLoc = (e, airport, index) => {
		// stop event bubble-up which triggers unnecessary events
		e.stopPropagation();
		setSelectedMarker({ airport, index });
		mapRef.current.flyTo({ center: [airport.lon, airport.lat], zoom: 10 });
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
				{foodProgramsData.map((airport, index) => {
					return (
						<Marker
							key={index}
							longitude={airport.longitude}
							latitude={airport.latitude}
						>
							<button
								type='button'
								className='cursor-pointer'
								onClick={(e) => zoomToSelectedLoc(e, airport, index)}
							>
								{<MapPin size={30} color='tomato' />}
							</button>
						</Marker>
					);
				})}
			</Map>
		</main>
	);
}
