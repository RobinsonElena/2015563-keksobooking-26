const TITLES = [
  'В центре',
  'Бизнес-центр',
  'High-tech',
  'На окраине',
  'Подходит всем',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

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

const getRandomPositiveInteger = (a, b) => {   //Функция генерации положительного числа
  if (a < 0 || b <= a) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomFloat = (min, max, digits = 5) => {   //Функция генерации положительного числа с плавающей точкой
  if (min < 0 || max <= min) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  return +(Math.random() * (max - min) + min).toFixed(digits); //Максимум и минимум включаются
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];   //Функция генерации элемента из массива

const getShuffledArray = (elements) => {   //Функция перемешивания и генерации нового массива
  const newArray = elements.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

let avatarNumber = 0;
const getAvatarNumber = () => {   //Функция для получения неповторяющегося адреса изображения с "0" для однозначных
  for (let i = 1; i <= RENT_OFFER_COUNT; i++){
    avatarNumber += 1;
    const formattedAvatarNumber = (avatarNumber < 10) ? `0${avatarNumber}` : avatarNumber;
    return `img/avatars/user${formattedAvatarNumber}.png`;
  }
};

const createRentOffers = () => {   //Функция создания объявления
  const location = {
    lat: getRandomFloat(LAT_MIN, LAT_MAX),
    lng: getRandomFloat(LNG_MIN, LNG_MAX)
  };

  return {
    author: {
      avatar: getAvatarNumber()
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

const rentOffers = () => Array.from({length: RENT_OFFER_COUNT}, createRentOffers);   //Функция создания массива из объявлений

rentOffers();
