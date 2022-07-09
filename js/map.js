import {createRentOffers} from './data.js';
import {createRentOfferCard} from './advert-card.js';
import {activateFilters, activateForm} from './advert-form.js';

const mainPin = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
};

const adPin = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
};

const canvas = document.querySelector('#map-canvas');
const addressField = document.querySelector('#address');

const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      activateFilters(true);
      activateForm(true);
    })
    .setView({
      lat: 35.70292,
      lng: 139.68531,
    }, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: mainPin.iconUrl,
    iconSize: mainPin.iconSize,
    iconAnchor: [mainPin.iconSize / 2, mainPin.iconSize],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.70292,
      lng: 139.68531,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  const adPinIcon = L.icon({
    iconUrl: adPin.iconUrl,
    iconSize: adPin.iconSize,
    iconAnchor: [adPin.iconSize / 2, adPin.iconSize],
  });

  const markerGroup = L.layerGroup().addTo(map);

  const createMarkers = (autor, offer, location) => {
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
      .bingPopup(createRentOfferCard(autor, offer));
  };

  const similarRentOffersCards = createRentOffers();
  const card = createRentOfferCard(similarRentOffersCards[0]);

  canvas.append(card);

  similarRentOffersCards.forEach(({autor, offer, location}) => {
    createMarkers(autor, offer, location);
  });

  mainPinMarker.on('moveend', (evt) => {
    addressField.value = evt.target.getLatLng();
  });
};

export {initMap};
