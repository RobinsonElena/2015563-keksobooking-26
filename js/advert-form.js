import {toggleElements} from './util.js';
import {typeDictionary} from './advert-card.js';

const MIN_PRICE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const CAPACITY_OPTIONS = {
  '1': [1],
  '2': [1, 2],
  '3': [1, 2, 3],
  '100': [0],
};

const filterElement = document.querySelector('.map__filters');
const filterList = filterElement.querySelectorAll('.map__filters select, .map__filters fieldset');
const formElement = document.querySelector('.ad-form');
const formList = formElement.querySelectorAll('.ad-form fieldset');

const deactivatePage = () => {
  filterElement.classList.add('map__filters--disabled');
  toggleElements(filterList, true);
  formElement.classList.add('ad-form--disabled');
  toggleElements(formList, true);
};

const activateFilters = () => {
  filterElement.classList.remove('map__filters--disabled');
  toggleElements(filterList, false);
};

const activateForm = () => {
  formElement.classList.remove('ad-form--disabled');
  toggleElements(formList, false);
};

const pristine = new Pristine(formElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__error',
}, false);

const typeHousing = formElement.querySelector('#type');
const priceHousing = formElement.querySelector('#price');

const validatePrice = () => MIN_PRICE[typeHousing.value];
const getMinPriceMessage = () => `${typeDictionary[typeHousing.value]} - минимальная цена за ночь ${validatePrice}`;

pristine.addValidator(priceHousing, validatePrice, getMinPriceMessage);

const roomAmount = formElement.querySelector('#room_number');
const capacityAmount = formElement.querySelector('#capacity');

const validateCapacity = () => {CAPACITY_OPTIONS[roomAmount.value].includes(capacityAmount.value);};
const getCapacityMessage = () => {
  if (+(roomAmount.value) === 100 || +(capacityAmount.value) > +(roomAmount.value)) {
    return 'Количество гостей не может быть больше количества комнат';
  }
};

pristine.addValidator(roomAmount, validateCapacity, getCapacityMessage);
pristine.addValidator(capacityAmount, validateCapacity, getCapacityMessage);

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

export {deactivatePage, activateFilters, activateForm};
