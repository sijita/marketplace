'use client';
import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [cityName, setCityName] = useState<string>('');
  console.log(cityName);

  // Function to get city name from coordinates using Nominatim API
  const getCityFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`
      );
      const data = await response.json();

      const city =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.municipality ||
        data.address.county ||
        'Unknown location';

      setCityName(city);
      Cookies.set('userCity', city);
      return city;
    } catch (error) {
      console.error('Error getting city name:', error);
      return 'Unknown location';
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;
    // Custom marker icon configuration
    const customIcon = L.icon({
      iconUrl: '/images/marker-icon.png',
      iconSize: [35, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const map = L.map(mapRef.current).setView([4.5709, -74.2973], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const savedCity = Cookies.get('userCity');
    const savedLat = Cookies.get('userLat');
    const savedLng = Cookies.get('userLng');

    let marker: L.Marker;
    let popup: L.Popup;

    const createMarker = async (lat: number, lng: number) => {
      const city = await getCityFromCoordinates(lat, lng);

      if (marker) {
        marker.setLatLng([lat, lng]);
        if (popup) {
          popup.setContent(city);
        }
      } else {
        marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        popup = L.popup().setContent(city);
        marker.bindPopup(popup).openPopup();
      }

      // Store coordinates as temporary reference
      Cookies.set('userLat', lat.toString());
      Cookies.set('userLng', lng.toString());

      return marker;
    };

    if (savedLat && savedLng) {
      marker = L.marker([parseFloat(savedLat), parseFloat(savedLng)], {
        icon: customIcon,
      }).addTo(map);

      map.setView([parseFloat(savedLat), parseFloat(savedLng)], 13);

      if (savedCity) {
        popup = L.popup().setContent(savedCity);
        marker.bindPopup(popup).openPopup();
        setCityName(savedCity);
      } else {
        getCityFromCoordinates(parseFloat(savedLat), parseFloat(savedLng)).then(
          (city) => {
            popup = L.popup().setContent(city);
            marker.bindPopup(popup).openPopup();
          }
        );
      }
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          createMarker(latitude, longitude);
          map.setView([latitude, longitude], 13);
        },
        (error) => {
          console.error('Error getting location:', error);
          createMarker(4.5709, -74.2973);
          map.setView([4.5709, -74.2973], 13);
        }
      );
    }

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      createMarker(lat, lng);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ height: '400px', width: '100%' }}
      className="rounded-xl"
    />
  );
}
