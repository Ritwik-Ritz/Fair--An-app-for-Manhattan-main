/*global google*/
import { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { GoogleMap, HeatmapLayer, useJsApiLoader, Marker } from '@react-google-maps/api';

import PlaceAutocomplete from '../components/mapautocomplete';
import axiosInstance from '../axios';
import mapstyle from '../components/mapstyles';
import darkmapstyle from '../components/darkmapstyles';
import { MapSidebar } from '../components/mapsidebar';
import MapAlertCard from '../components/mapalertcard';
import Legend from '../components/maplegend';
import { heatData } from './heatdata';
import { SettingsContext } from '../context/SettingsContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import LoadingScreen from '../components/loadingscreen';
import constant from '../constant';

const centerPosition = { lat: 40.773631, lng: -73.971290 };
const googleMapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const libs = ['visualization', 'places'];


let predictedData = [];
let aqiForLocation = 100;

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [markerPos, setMarkerPos] = useState(centerPosition);
  const [isMapSidebarOpen, setIsMapSidebarOpen] = useState(false);
  const [shouldRenderMarker, setShouldRenderMarker] = useState(false);
  const [shouldRenderHeatMap, setShouldRenderHeatMap] = useState(false);
  const [heatMapData, setHeatMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(11.7);
  
  const {darkMode} = useContext(SettingsContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsKey,
    libraries: libs
  });

  const airQualityGradient = [
    "rgba(32,205, 50,0)",
    "rgba(0, 228, 0, 1)",
    "rgba(32, 205, 50, 1)",
    "rgba(255, 255, 0, 1)",
    "rgba(255, 126, 0, 1)",
    "rgba(255, 0, 0, 1)",
    "rgba(143, 63, 151, 1)",
    "rgba(126, 0, 35, 1)",
  ];

  const GetheatData = (predictedData) => {
    const newHeatMapData = predictedData.flatMap(result => {
      var wt = 0.6 / 9;
      if (result.predicted_aqi <= 50) wt = 0.1 / 9;
      else if (result.predicted_aqi <= 100) wt = 0.2 / 9;
      else if (result.predicted_aqi <= 150) wt = 0.3 / 9;
      else if (result.predicted_aqi <= 200) wt = 0.4 / 9;
      else if (result.predicted_aqi <= 300) wt = 0.5 / 9;
  
      return [
        { lat: result.max_lat, lng: result.max_lon, weight: wt },
        { lat: result.max_lat, lng: result.min_lon, weight: wt },
        { lat: result.min_lat, lng: result.max_lon, weight: wt },
        { lat: result.min_lat, lng: result.min_lon, weight: wt },
        { lat: (result.max_lat + result.min_lat) / 2, lng: (result.max_lon + result.min_lon) / 2, weight: wt },
        {lat: (result.max_lat + result.min_lat) / 2, lng: result.max_lon, weight: wt},
        {lat: (result.max_lat + result.min_lat) / 2, lng: result.min_lon, weight: wt},
        {lat: result.max_lat, lng: (result.max_lon + result.min_lon) / 2, weight: wt },
        {lat: result.min_lat, lng: (result.max_lon + result.min_lon) / 2, weight: wt },
      ];
    });
    return newHeatMapData;
  }

  const fetchAQIData = useCallback(async () => {
    const locationInput = {
      time_stamp: Math.floor(Date.now() / 1000),
    };

    try {
      const response = await axiosInstance.post('/map/getAllAQIValues', locationInput);
      if(response.data.length > 0)
      {
        predictedData = response.data;
        const newHeatMapData = GetheatData(predictedData);
        setHeatMapData(newHeatMapData);
        console.log("Location data sent successfully!", response);
        setLoading(false);
        setLastFetchTime(Date.now());
      }
      else
      {
        predictedData = heatData;
        setHeatMapData(GetheatData(predictedData))
        setLoading(false);
        setLastFetchTime(Date.now());
      }
    } catch (error) {
      console.error("There was an error sending the location data!", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAQIData();

    
    const interval = setInterval(() => {
      fetchAQIData();
    }, 1800000); // 

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [fetchAQIData]);

  const GetAqiForLocation = (loc, date) => {
    // Use the date parameter to filter or fetch data accordingly
    console.log(loc)
    const data = {
      loc_lat: loc.lat,
      loc_lon: loc.lng,
      time_stamp: Math.floor(date.getTime() / 1000)
    };

    axiosInstance.post('/map/getAQIValueForALocation', data)
      .then(response => {
        console.log(response.data.predicted_aqi);
        return response.predicted_aqi;
      })
      .catch(error => {
        console.error("There was an error sending the data!", error);
    });

    return 0;
  };

  const handlePlaceSelected = useCallback((location) => {
    if (map) {
      map.panTo(new google.maps.LatLng(location.lat(), location.lng()));
      map.zoom = 12;
      setMarkerPos({ lat: location.lat(), lng: location.lng() });
      aqiForLocation = GetAqiForLocation({ lat: location.lat(), lng: location.lng() }, selectedDate);
    }
  }, [map, selectedDate]);

  const mapContainerStyle = useMemo(() => ({
    position: 'relative',
    width:'100vw',
    height: '100vh'
  }), [isMapSidebarOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRenderMarker(true);
      setShouldRenderHeatMap(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (<LoadingScreen loadingtext = {constant.Mappage.loading_text}/>);
  }

  const formatLastFetchTime = (timestamp) => {
    if (timestamp === 0) return "Never";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const handleZoomChanged = () => {
    if (map) {
      const newZoomLevel = map.getZoom();
      setZoomLevel(newZoomLevel);
    }
  };

  const getHeatmapRadius = () => {
    console.log(zoomLevel);
    if (zoomLevel < 13) return 20;
    if (zoomLevel < 14) return 40;
    if(zoomLevel < 15) return 80;
    if(zoomLevel < 16) return 150;
    return 300;
  };

  const getHeatmapOpacity = () => {
    if (zoomLevel < 13) return 0.2;
    return 0.4;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <MapSidebar isOpen={isMapSidebarOpen} />
      <div style={{ width: '100vw', height: '100vh' }} className='flex-1 ml-0'>

      <GoogleMap
        mapContainerStyle={mapContainerStyle} center={centerPosition} 
        zoom={zoomLevel} onZoomChanged = {handleZoomChanged} onLoad={(map) => setMap(map)}
        options={{
          disableDefaultUI: {
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true,
          },
          styles: darkMode ? darkmapstyle : mapstyle,
          gestureHandling: 'greedy',
          zoomControl:true,
          minZoom: 8,
          maxZoom: 16
        }}
      >
          {map && !loading && heatMapData.length > 0 && shouldRenderHeatMap &&
            <HeatmapLayer
              data={heatMapData.map((data) => (
                { location: new google.maps.LatLng(data.lat, data.lng), weight: data.weight }
              ))}
              options={{radius: getHeatmapRadius(), dissipating: true, opacity: getHeatmapOpacity(), gradient: airQualityGradient}}
            />
          }

          {shouldRenderMarker && <Marker position={{ lat: markerPos.lat, lng: markerPos.lng }} />}

          <div className='flex flex-col fixed ml-3 z-10 gap-2 top-12 mt-6'>
          <div className="flex flex-wrap justify-center items-center ml-3 p-2">
            <PlaceAutocomplete onPlaceSelected={handlePlaceSelected} className="lg:w-1/2 md:w-full sm:w-full" />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy/MM/dd"
              className={`${darkMode ? 
                "ml-2 px-2 py-1 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-800 text-gray-200" 
                : 
                "ml-2 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              } lg:w-1/2 md:w-full sm:w-full lg:ml-4 md:ml-2 sm:ml-2 sm:p-1`}
            />
          </div>
            <MapAlertCard aqi={aqiForLocation} />
          </div>

          <div className='flex fixed z-10 right-2 mr-3 bottom-4'>
            <Legend />
          </div>
        </GoogleMap>
      </div>
    </div>
  );
}
