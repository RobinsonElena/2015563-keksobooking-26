// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

/*const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max <= min) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

getRandomIntInclusive(0, 10);

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/number/tofixed

const getRandomInclusive = (min, max, digits = 5) => {
  if (min < 0 || max <= min) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  return +(Math.random() * (max - min + 1) + min).toFixed(digits); //Максимум и минимум включаются
};

getRandomInclusive(0, 10);*/

//Создать массив из 10 сгенерированных JS-объектов

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

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b <= a) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomInclusive = (min, max, digits = 5) => {
  if (min < 0 || max <= min) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  return +(Math.random() * (max - min + 1) + min).toFixed(digits); //Максимум и минимум включаются
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createOffer = (index) => {
  location = {
    lat: getRandomInclusive(LAT_MIN, LAT_MAX, 5),
    lng: getRandomInclusive(LNG_MIN, LNG_MAX, 5)
  };

  return {
    /*autor: {
      if (index.lenght < 2) {
        result = `img/avatars/user0${index + 1}.png`};
      else {result = `img/avatars/user${index + 1}.png`}; //avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
      avatar
    },*/
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${location.lat}, ${location.lng}`,
      price: getRandomPositiveInteger(1, 100000),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 3),
      guests: getRandomPositiveInteger(0, 3),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getRandomArrayElement(FEATURES),  //Значения не должны повторяться. Как это сделать?
      description: getRandomArrayElement(DESCRIPTION),
      photos: getRandomArrayElement(PHOTOS),   //массив строк — массив случайной длины из значений. Переделать
    },
  };
};

const rentOffer = () => Array.from({length: RENT_OFFER_COUNT}, createOffer);

getRandomInclusive,
getRandomArrayElement,
getRandomPositiveInteger,

console.log(rentOffer);
