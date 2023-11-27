import './map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import { smartCities } from '../../data/smartCities';
import { useDispatch } from 'react-redux';
import { setCityTabById, setIsShown } from '../../services/state/display/cityTabSlice';

export default function Map() {
  const dispatch = useDispatch();
  const customIcon = new Icon({
    iconUrl: require('../../assets/icons/location.png'),
    iconSize: [30, 30]
  })

  const markers = smartCities.map( markerData =>
    <Marker 
      id={markerData.id} 
      position={markerData.coordinates} 
      icon={customIcon} 
      eventHandlers={{ click: () => openCityTab(markerData.id) }}
    />
  )

  function openCityTab(cityId) {
    dispatch(setCityTabById(cityId))
    dispatch(setIsShown(true))
  }

  return (
    <MapContainer center={[50.45, 30.5241]} zoom={13}>
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
      />
      {markers}
    </MapContainer>
  )
}