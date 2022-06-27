import {
  getRandomPositiveInteger,
  getRandomFloat,
  getRandomArrayElement,
  getShuffledArray,
} from './util.js';

const TITLES = [
  'В центре',
  'Бизнес-центр',
  'High-tech',
  'На окраине',
  'Подходит всем',
];

const TYPES = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Евродизайн',
  'В старых традициях',
  'С видом на парк',
  'Дружелюбный к животным',
  'В дали от цивилизации',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const RENT_OFFER_COUNT = 10;

const createRentOffer = (index) => {
  const formattedAvatarNumber = index < 10 ? `0${index}` : index;

  const location = {
    lat: getRandomFloat(LAT_MIN, LAT_MAX),
    lng: getRandomFloat(LNG_MIN, LNG_MAX)
  };

  return {
    author: {
      avatar: `img/avatars/user${formattedAvatarNumber}.png`
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger(1, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 3),
      guests: getRandomPositiveInteger(0, 3),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getShuffledArray(FEATURES),
      description: getRandomArrayElement(DESCRIPTION),
      photos: getShuffledArray(PHOTOS),
    },
    location
  };
};

const createRentOffers = () => {
  const result = [];
  for (let i = 1; i <= RENT_OFFER_COUNT; i++) {
    const offer = createRentOffer(i);
    result.push(offer);
  }
  return result;
};

export {createRentOffers};
