import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router';
import { SOCKETCxt } from '../../../utilities/soket/SoketProvider';
import { useQuery } from '@apollo/client';
import { GET_MAP_DATA } from '../../../utilities/Apollo/Querries';
import ReusableTable from '../../components/tableComponent/ReusableTable';
import { MAP_VEHICLE_TABLE } from '../../components/table/FilteringTable/Columns';

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = () => {
  const mapRef = useRef();
  const zoom = 0;
  const containerStyle = {
    width: '100%',
    height: '400px',
  };
  const center = {
    lat: 28.626137,
    lng: 79.821603,
  };
  // const initialMarkers = [
  //   {
  //     position: {
  //       lat: 28.625485,
  //       lng: 79.821091,
  //     },
  //     draggable: true,
  //   },
  //   {
  //     position: {
  //       lat: 28.625293,
  //       lng: 79.817926,
  //     },
  //     draggable: false,
  //   },
  //   {
  //     position: {
  //       lat: 28.625182,
  //       lng: 79.81464,
  //     },
  //     draggable: true,
  //   },
  // ]

  const [markers, setMarkers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const history = useHistory();
  const tableRef = useRef();
  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/page-login');
    }
  }, []);

  const { data: current } = useQuery(GET_MAP_DATA, {
    options: {
      showAll: true,
    },
    onCompleted: (data) => {
      console.log(data);
      setMarkers(
        data.getVehicles.data
          .filter(({ latestLocation }) => latestLocation !== null)
          .map(({ _id, details, latestLocation }) => ({
            id: _id,
            position: {
              name: details.name,
              lat: latestLocation.latitude,
              lng: latestLocation.longitude,
            },
            draggable: false,
          })),
      );
      setVehicles(data.getVehicles.data);
    },
  });

  const mapClicked = async (event) => {
    console.log(event.latlng.lat, event.latlng.lng);
  };

  const markerClicked = (marker, index) => {
    console.log(marker.position.lat, marker.position.lng);
  };

  const markerDragEnd = (event, index) => {
    console.log(event.lat, event.lng);
  };

  const { CoreSocket } = useContext(SOCKETCxt);

  useEffect(() => {
    try {
      CoreSocket.on('GPS', (data) => {
        console.log({ GPS: data });
        const updatedLocation = markers.map((marker) =>
          marker.id === data.vehicleId
            ? {
                ...marker,
                position: {
                  ...marker.position,
                  lat: data.location.latitude,
                  lng: data.location.longitude,
                },
              }
            : marker,
        );

        setMarkers(updatedLocation);
      });
    } catch (error) {
      console.log(error);
    }
  }, [markers]);
  const columns = useMemo(() => MAP_VEHICLE_TABLE, []);
  return (
    <>
      <ReusableTable
        data={vehicles}
        columns={columns}
        // setId={setID}
        // setModal={setOpenIssueModal}
        fileName='Vehicle List'
        sheetName='vehicles'
      />

      <MapContainer
        style={containerStyle}
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; Oustoli Fleet Manger tracking system'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MapContent onClick={mapClicked} />
        {markers.map((marker, index) => (
          <MarkerContent
            key={index}
            position={marker.position}
            draggable={marker.draggable}
            onMarkerClick={(event) => markerClicked(marker, index)}
            onDragEnd={(event) => markerDragEnd(event, index)}
          />
        ))}
      </MapContainer>
    </>
  );
};

const MapContent = ({ onClick }) => {
  const map = useMapEvents({
    click: (event) => onClick(event),
  });
  return null;
};

const MarkerContent = (props) => {
  const markerRef = useRef();
  const { position, draggable, onMarkerClick, onDragEnd } = props;

  return (
    <Marker
      position={position}
      draggable={draggable}
      eventHandlers={{
        click: (event) => onMarkerClick(event),
        dragend: () => onDragEnd(markerRef.current.getLatLng()),
      }}
      ref={markerRef}
    >
      <Popup>
        <b>{position.name}</b>
      </Popup>
    </Marker>
  );
};

export default MapComponent;
