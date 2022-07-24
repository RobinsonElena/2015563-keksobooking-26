import {debounce} from './util.js';
import {clearMarkers, renderMarkers} from './map.js';

const DEFAULT_VALUE = 'any';
const OFFERS_COUNT = 10;
const PRICE_LEVEL = {
  any: {
    min: 0,
    max: 100000,
  },
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 100000,
  },
};

const formFilter = document.querySelector('.map__filters');
const typeFilter = formFilter.querySelector('#housing-type');
const priceFilter = formFilter.querySelector('#housing-price');
const roomsFilter = formFilter.querySelector('#housing-rooms');
const guestsFilter = formFilter.querySelector('#housing-guests');
const featuresFilter = formFilter.querySelectorAll('.map__checkbox');

const filterByType = (offer) => typeFilter.value === DEFAULT_VALUE || offer.offer.type === typeFilter.value;
const filterByRooms = (offer) => roomsFilter.value === DEFAULT_VALUE || offer.offer.rooms === +roomsFilter.value;
const filterByGuests = (offer) => guestsFilter.value === DEFAULT_VALUE || offer.offer.guests === +guestsFilter.value;

const filterByPrice = (offer) =>
  offer.offer.price >= PRICE_LEVEL[priceFilter.value].min &&
  offer.offer.price < PRICE_LEVEL[priceFilter.value].max;

const filterByFeatures = (offer) => Array.from(featuresFilter).every((filterFeature) => {
  if (!filterFeature.checked) {
    return true;
  }
  if (!offer.offer.features) {
    return false;
  }
  return offer.offer.features.includes(filterFeature.value);
});

const filterOffers = (offers) => {
  const filteredOffers = [];

  for (const offer of offers) {
    if (filteredOffers.length >= OFFERS_COUNT) {
      break;
    }
    if (
      filterByType(offer) &&
      filterByRooms(offer) &&
      filterByPrice(offer) &&
      filterByGuests(offer) &&
      filterByFeatures(offer)
    ) {
      filteredOffers.push(offer);
    }
  }
  return filteredOffers;
};

const onFilterChange = (data) => {
  clearMarkers();
  const filteredMarkers = filterOffers(data);
  renderMarkers(filteredMarkers);
};

const setFilterListener = (data) => {
  formFilter.addEventListener('change', debounce(() => onFilterChange(data)));
  formFilter.addEventListener('reset', debounce(() => onFilterChange(data)));
};

export {setFilterListener};
