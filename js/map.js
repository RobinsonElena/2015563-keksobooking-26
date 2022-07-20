import {createRentOfferCard} from './advert-card.js';
import {activateForm, activateFilters} from './advert-form.js';
import {getData} from './api.js';
import {filterOffers} from './filters.js';
import {debounce} from './util.js';

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
  iconSize: [mainPin.iconSize.width, mainPin.iconSize.height],
  iconAnchor: [mainPin.iconSize.width / 2, mainPin.iconSize.height],
});

const adPinIcon = L.icon({
  iconUrl: adPin.iconUrl,
  iconSize: [adPin.iconSize.width, adPin.iconSize.height],
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

const onPinMove = (evt) => {
  const coords = evt.target.getLatLng();
  addressField.value = `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`;
};

const renderMarkers = (offers) => {  //добавление маркеров на карту
  offers.forEach((offer) => {
    const {location} = offer;
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

const onLoadSuccess = (offers) => {
  activateFilters();

  const formFilterElement = document.querySelector('.map__filters');
  formFilterElement.addEventListener(
    'change',
    debounce(() => {
      markerGroup.clearLayers();
      const filterArray = filterOffers(offers);
      filterArray.slice(0, 10).forEach((offer) => {
        renderMarkers(offer);
      });
    })
  );
};

const initMap = () => { //инициализация карты, создание и добавление маркеров
  map.on('load', () => {
    activateForm(true);
    getData(onLoadSuccess);
  })
    .setView({
      lat,
      lng,
    }, scale);

  L.tileLayer(layer, attribution).addTo(map);

  mainPinMarker.addTo(map); //добавление маркера
  mainPinMarker.on('move', onPinMove);
};

export {initMap, addressField};
