import './map.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import { smartCities } from '../../data/smartCities';
import { useDispatch } from 'react-redux';
import { setCityTabByKey, setIsShown } from '../../services/state/display/cityTabSlice';

export default function Map() {
  const dispatch = useDispatch();
  const customIcon = new Icon({
    iconUrl: require('../../assets/icons/location.png'),
    iconSize: [30, 30]
  })

  const markers = Object.entries(smartCities).map(([key, markerData]) =>
    <Marker 
      id={markerData.id} 
      position={markerData.coordinates} 
      icon={customIcon} 
      eventHandlers={{ 
        click: () => openCityTab(key),
        mouseover: (event) => event.target.openPopup(),
        mouseout: (event) => event.target.closePopup(),
      }}
    >
      <Popup>{markerData.name}</Popup>
    </Marker>
  )

  function openCityTab(cityKey) {
    dispatch(setCityTabByKey(cityKey))
    dispatch(setIsShown(true))
  }


  return (
    <MapContainer center={[35, 10]} zoom={2} worldCopyJump={true} minZoom={2}
    >
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