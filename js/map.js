//import {createRentOffers} from './data.js';
import {createRentOfferCard} from './advert-card.js';
import {activateForm} from './advert-form.js';

const lat = 35.70292;
const lng = 139.68531;
const scale = 12;

const mainPin = {
  iconUrl: './img/main-pin.svg',
  iconSize: {
    width: 52,
    height: 52,
  },
};

const adPin = {
  iconUrl: './img/pin.svg',
  iconSize: {
    width: 40,
    height: 40,
  },
};

const layer = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const addressField = document.querySelector('#address');
addressField.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

const mainPinIcon = L.icon({
  iconUrl: mainPin.iconUrl,
  iconSize: mainPin.iconSize,
  iconAnchor: [mainPin.iconSize.width / 2, mainPin.iconSize.height],
});

const adPinIcon = L.icon({
  iconUrl: adPin.iconUrl,
  iconSize: adPin.iconSize,
  iconAnchor: [adPin.iconSize.width / 2, adPin.iconSize.height],
});

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinMarker = L.marker(
  {
    lat,
    lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

//const rentRentOffersCards = createRentOffers();

const renderMarkers = (offers) => {  //добавление маркеров на карту
  offers.forEach((offer) => {
    const {location} = offers;
    const adMarker = L.marker(
      {
        lat: location.lat,
        lng: location.lng,
      },
      {
        icon: adPinIcon,
      },
    );

    adMarker
      .addTo(markerGroup)
      .bindPopup(createRentOfferCard(offer));

  });
};

const initMap = (ads) => { //инициализация карты, создание и добавление маркеров
  map.on('load', () => {
    activateForm(true);
  })
    .setView({
      lat,
      lng,
    }, scale);

  L.tileLayer(layer, attribution).addTo(map);

  mainPinMarker.addTo(map); //добавление маркера

  //rentRentOffersCards.forEach(({author, offer, location}) => renderMarkers(author, offer, location));
  ads.forEach(({author, offer, location}) => renderMarkers(author, offer, location));

  mainPinMarker.on('move', (evt) => {
    addressField.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
};

export {initMap};
