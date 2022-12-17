import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { useRef, useEffect, useState, React } from 'react';
import { createCustomEqual } from 'fast-equals';
import { isLatLngLiteral } from '@googlemaps/typescript-guards';

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
	if (
		isLatLngLiteral(a) ||
		a instanceof google.maps.LatLng ||
		isLatLngLiteral(b) ||
		b instanceof google.maps.LatLng
	) {
		return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
	}

	return deepEqual(a, b);
});

const useDeepCompareMemoize = (value) => {
	const ref = useRef();

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value;
	}

	return ref.current;
};
function useDeepCompareEffectForMaps(callback, dependencies) {
	useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

const Map = ({
	onClick,
	onIdle,
	children,
	style,
	center,
	zoom,
	...options
}) => {
	const ref = useRef(null);
	const [map, setMap] = useState();

	useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, {}));
		}
	}, [ref, map]);

	// useEffect(() => {
	// 	new window.google.maps.Map(ref.current, {
	// 		center,
	// 		zoom,
	// 	});
	// });

	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	useEffect(() => {
		if (map) {
			['click', 'idle'].forEach((eventName) =>
				google.maps.event.clearListeners(map, eventName)
			);

			if (onClick) {
				map.addListener('click', onClick);
			}

			if (onIdle) {
				map.addListener('idle', () => onIdle(map));
			}
		}
	}, [map, onClick, onIdle]);

	const wrapper = () => console.log(children);
	// children.map((child) => {
	// 	if (React.isValidElement(child)) {
	// 		return React.cloneElement(child, { map });
	// 	}
	// });

	return (
		<>
			<div ref={ref} style={style} id='map' />
			{/* {wrapper()} */}
			{/* {React.Children.map(children, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, { map });
				}
			})} */}
		</>
	);
};

const Marker = (options) => {
	const [marker, setMarker] = useState();

	useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}

		// remove marker from map on unmount
		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);

	useEffect(() => {
		if (marker) {
			marker.setOptions(options);
		}
	}, [marker, options]);

	return null;
};

const MapComponent = () => {
	const [clicks, setClicks] = useState([]);
	const [zoom, setZoom] = useState(3);
	const [center, setCenter] = useState({
		lat: -34.397,
		lng: 150.644,
	});

	const onClick = (e) => {
		console.log(e);
		setClicks([...clicks, e.latLng]);
	};

	const onIdle = (m) => {
		console.log('onIdle');
		setZoom(m.getZoom());
		setCenter(m.getCenter().toJSON());
	};

	const render = (status) => {
		if (status === Status.LOADING) return <h3>..Loading..{status}</h3>;
		if (status === Status.FAILURE) return <h3>..Failed..{status}</h3>;
		return null;
	};

	return (
		<div style={{ display: 'flex', height: '100%' }}>
			<Wrapper
				apiKey={'AIzaSyAxL-vhNZ0n70bdfyOZLNs8SDldhUpd2xQ'}
				render={render}>
				<Map
					center={center}
					onClick={onClick}
					onIdle={onIdle}
					zoom={zoom}
					// style={{ flexGrow: '1', height: '100%' }}
				>
					<Marker position={center} />
				</Map>
			</Wrapper>
		</div>
	);
};

export default MapComponent;
