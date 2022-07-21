import {createRentOfferCard} from './advert-card.js';
import {activateForm, activateFilters} from './advert-form.js';
import {getData} from './api.js';
import {setFilterListener} from './filters.js';

const MAX_OFFERS = 10;
const LAT = 35.70292;
const LNG = 139.68531;
const SCALE = 12;
const LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAIN_PIN = {
  iconUrl: './img/main-pin.svg',
  iconSize: {
    width: 52,
    height: 52,
  },
};

const AD_PIN = {
  iconUrl: './img/pin.svg',
  iconSize: {
    width: 40,
    height: 40,
  },
};

const DEFAULT_ADDRES = `${LAT}, ${LNG}`;

const mainPinIcon = L.icon({
  iconUrl: MAIN_PIN.iconUrl,
  iconSize: [MAIN_PIN.iconSize.width, MAIN_PIN.iconSize.height],
  iconAnchor: [MAIN_PIN.iconSize.width / 2, MAIN_PIN.iconSize.height],
});

const adPinIcon = L.icon({
  iconUrl: AD_PIN.iconUrl,
  iconSize: [AD_PIN.iconSize.width, AD_PIN.iconSize.height],
  iconAnchor: [AD_PIN.iconSize.width / 2, AD_PIN.iconSize.height],
});

const mainPinMarker = L.marker(
  {
    lat: LAT,
    lng: LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const map = L.map('map-canvas');
const addressField = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const markerGroup = L.layerGroup().addTo(map);

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

const clearMarkers = () => {
  markerGroup.clearLayers();
};

const resetMap = () => {
  mainPinMarker.setLatLng(
    {
      lat: LAT,
      lng: LNG,
    }
  );
  map.setView({
    lat: LAT,
    lng: LNG,
  }, SCALE);
  addressField.value = DEFAULT_ADDRES;
};

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng({
    lat: LAT,
    lng: LNG,
  });
  map.setView({
    lat: LAT,
    lng: LNG,
  });
});

const onLoadSuccess = (offers) => {
  renderMarkers(offers.slice(0, MAX_OFFERS));
  activateFilters();
  setFilterListener(offers);
};

const initMap = () => { //инициализация карты, создание и добавление маркеров
  map.on('load', () => {
    activateForm(true);
    getData(onLoadSuccess);
  })
    .setView({
      lat: LAT,
      lng: LNG,
    }, SCALE);

  L.tileLayer(LAYER, ATTRIBUTION).addTo(map);

  mainPinMarker.addTo(map); //добавление маркера
  mainPinMarker.on('move', onPinMove);
};

export {initMap, clearMarkers, renderMarkers, resetMap};  //resetMap может и не нужен здесь
