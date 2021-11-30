import React, { useRef, useEffect } from 'react';
 
export default function MapBox({ center, zoom }){
  const mapRef = useRef();
 
  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });
  }, [center, zoom]);
 
  return (
    <div
      ref={mapRef}
      className="w-full h-full border border-dashed border-gray-main p-2 bg-white-sub"
      id="map"
    />
  );
};
 