import googleMaps from '@google/maps';

export const config = {
  url: 'https://maps.googleapis.com/maps/api/js?',
  key: 'AIzaSyBb7bGZ2aw7QRoBgFfl25kxHDwABpjgqDI',
  v: '3.exp',
  center: {
    lat: -12.98,
    lng: -38.47,
  },
  zoom: 13,
}

export default googleMaps.createClient(config);