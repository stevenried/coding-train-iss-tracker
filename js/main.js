//Set endpoint
const apiEndpoint = 'https://api.wheretheiss.at/v1/satellites/25544'

//Making map and tiles
const map = L.map('issMap').setView([0.0, 0.0], 1)
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileURL, {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(map)

//Making a marker with custom icon
const issIcon = L.icon({
  iconUrl: './assets/iss.png',
  iconSize: [50, 32],
  iconAnchor: [25, 16],
})
const marker = L.marker([0.0, 0.0], { icon: issIcon }).addTo(map)

getISS()

setInterval(getISS, 1500)

async function getISS() {
  const response = await fetch(apiEndpoint)
  const data = await response.json()
  const { latitude, longitude } = data

  marker.setLatLng([latitude, longitude])
  map.setView([latitude, longitude], 1)

  document.querySelector('[data-id-lat]').textContent = latitude.toFixed(2)
  document.querySelector('[data-id-long]').textContent = longitude.toFixed(2)
}
