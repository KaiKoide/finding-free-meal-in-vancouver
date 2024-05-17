'use client';

import { useState, useRef } from 'react';

import Map, { NavigationControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import classes from '@/app/Page.module.css';

export default function Home() {
	const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

	return (
		<main className={classes.mainStyle}>
			<Map
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
			</Map>
		</main>
	);
}
