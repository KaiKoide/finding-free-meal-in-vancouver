import Image from 'next/image';
import MapComponent from '../components/map';

export default function Home() {
	return (
		<div>
			<h1>This is page.tsx</h1>
			<MapComponent />
		</div>
	);
}
