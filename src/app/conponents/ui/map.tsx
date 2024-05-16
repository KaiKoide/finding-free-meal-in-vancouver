'use client';
import { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function SimpleMap() {
	mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';
	const mapContainer = useRef(null);
	const [map, setMap] = useState(null);

	useEffect(() => {
		const initializeMap = ({
			setMap,
			mapContainer,
		}: {
			setMap: any;
			mapContainer: any;
		}) => {
			const map = new mapboxgl.Map({
				container: mapContainer.current,
				center: [-123.11934, 49.24966], // Render Vancouver as the initial point(specify lng and lat)
				zoom: 11,
				style: 'mapbox://styles/kaikoide/clw70yrjl028m01rj86ct7a7k',
			});

			map.on('load', () => {
				setMap(map);
				map.resize();
			});
		};

		if (!map) initializeMap({ setMap, mapContainer });
	}, [map]);

	return (
		<>
			<div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
		</>
	);
}
