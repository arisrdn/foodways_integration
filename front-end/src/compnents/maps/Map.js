import * as React from "react";

import ReactMapGL from "react-map-gl";

const TOKEN =
	"pk.eyJ1IjoiYXJpc2FyZXMyMiIsImEiOiJja21hNHN4bncxbzN1Mm5wcnZqZmhmd245In0.mo6lAUdwinLZchtCADFthw";

export default function App({ children }) {
	const [viewport, setViewport] = React.useState({
		longitude: 106.91905,
		latitude: -6.9123,
		zoom: 10,
		height: "100%",
		width: "100%",
	});

	return (
		<ReactMapGL
			{...viewport}
			onViewportChange={setViewport}
			mapboxApiAccessToken={TOKEN}
			mapStyle="mapbox://styles/mapbox/streets-v11"
		>
			{children}
		</ReactMapGL>
	);
}
