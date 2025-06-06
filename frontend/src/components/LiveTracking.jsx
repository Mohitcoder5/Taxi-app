import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(defaultCenter);

    useEffect(() => {
        const success = (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ lat: latitude, lng: longitude });
        };

        const error = (err) => {
            console.error('Geolocation error:', err);
        };

        // Initial position
        navigator.geolocation.getCurrentPosition(success, error);

        // Live tracking
        const watchId = navigator.geolocation.watchPosition(success, error);

        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return <div>API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.</div>;
    }

    return (
        <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    );
};

export default LiveTracking;
