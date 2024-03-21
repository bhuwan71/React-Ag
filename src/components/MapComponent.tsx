import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { Modal } from 'antd'
import 'leaflet/dist/leaflet.css'
import WeatherDisplay from './WeatherDisplay'

const LeafletMap = () => {
  const [markerPosition, setMarkerPosition] = useState([27.7172, 85.324]) 
  const [coordinates, setCoordinates] = useState({ lat: 27.7172, lng: 85.324 })
  const [weatherData, setWeatherData] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    async function fetchWeatherData(lat: number, lng: number) {
      try {
        const apiKey = 'YOUR_WEATHER_API_KEY' 
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`
        )
        if (!response.ok) {
          throw new Error('Weather data not available')
        }
        const data = await response.json()
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      }
    }
    fetchWeatherData(coordinates.lat, coordinates.lng)
  }, [coordinates.lat, coordinates.lng])

  return (
    <div>
      <MapContainer
        center={[27.7172, 85.324]} 
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        maxBounds={[
          [27.6, 85.2], // Southwest
          [27.8, 85.4], // Northeast
        ]}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler
          setMarkerPosition={setMarkerPosition}
          setCoordinates={setCoordinates}
          setModalVisible={setModalVisible}
        />
        <Marker position={markerPosition} />
      </MapContainer>
      <Modal title="Location Details" visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <WeatherDisplay coordinates={coordinates} weatherData={weatherData} />
      </Modal>
    </div>
  )
}

const MapClickHandler = ({ setMarkerPosition, setCoordinates, setModalVisible }:any) => {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng
      if (lat >= 27.6 && lat <= 27.8 && lng >= 85.2 && lng <= 85.4) {
        setMarkerPosition([lat, lng])
        setCoordinates({ lat, lng })
        setModalVisible(true)
      } else {
        window.alert("You can only select locations within Kathmandu Valley.")
      }
    },
  })
  return null
}

export default LeafletMap
