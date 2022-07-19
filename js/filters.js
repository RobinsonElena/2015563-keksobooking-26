const DEFAULT_VALUE = 'any';
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

const formFilterElement = document.querySelector('.map__filters');
const typeFilterElement = formFilterElement.querySelector('#housing-type');
const priceFilterElement = formFilterElement.querySelector('#housing-price');
const roomsFilterElement = formFilterElement.querySelector('#housing-rooms');
const guestsFilterElement = formFilterElement.querySelector('#housing-guests');
const featuresFilterElement = formFilterElement.querySelectorAll('#housing-features [type="checkbox"]');

const isTypeFilter = (offer) => (typeFilterElement.value === DEFAULT_VALUE || offer.type === typeFilterElement.value);
const isRoomsFilter = (offer) => (roomsFilterElement.value === DEFAULT_VALUE || offer.rooms === +roomsFilterElement.value);
const isGuestsFilter = (offer) => (guestsFilterElement.value === DEFAULT_VALUE || offer.guests === +guestsFilterElement.value);

const isPriceFilter = (offer) =>
  offer.price >= PRICE_LEVEL[priceFilterElement.value].min &&
  offer.price < PRICE_LEVEL[priceFilterElement.value].max;

const isfeauteresFilter = (offer, feauteres) => {
  feauteres.every((feautere) => offer.offer.feauteres.includes(feautere));

  const filterFeatures = [];
  featuresFilterElement.forEach((checkbox) => {
    if (checkbox.checked) {
      filterFeatures.push(checkbox.value);
    }
  });
};

const filterOffers = (offers) =>
  offers.filter((offer) => isTypeFilter(offer) && isRoomsFilter(offer) && isGuestsFilter(offer) && isPriceFilter(offer) && isfeauteresFilter(offer));

export {filterOffers};
