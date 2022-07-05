import {toggleElements} from './util.js';

const MIN_PRICE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const CAPACITY_OPTIONS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const filterElement = document.querySelector('.map__filters');
const filterList = filterElement.querySelectorAll('.map__filters select, .map__filters fieldset');
const formElement = document.querySelector('.ad-form');
const formList = formElement.querySelectorAll('.ad-form fieldset');
const typeHousing = formElement.querySelector('#type');
const priceHousing = formElement.querySelector('#price');
const roomAmount = formElement.querySelector('#room_number');
const capacityAmount = formElement.querySelector('#capacity');

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

const initValidation = () => {
  const pristine = new Pristine(formElement, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'ad-form__error',
  }, false);

  const validatePrice = (value) => parseInt(value, 10) >= MIN_PRICE[typeHousing.value];
  const getMinPriceMessage = () => `Минимальная цена ${MIN_PRICE[typeHousing.value]}`;

  pristine.addValidator(priceHousing, validatePrice, getMinPriceMessage);

  const onTypeHousingChange = () => {
    priceHousing.placeholder = MIN_PRICE[typeHousing.value];
    pristine.validate(priceHousing);
  };

  typeHousing.addEventListener('change', onTypeHousingChange);

  const validateCapacity = () => {CAPACITY_OPTIONS[roomAmount.value].includes(capacityAmount.value);};
  const getCapacityMessage = () => {
    if (+(roomAmount.value) === 100) {
      return 'Комнаты не для гостей';
    } else if (+(capacityAmount.value) > +(roomAmount.value)) {
      return 'Гостей не больше, чем комнат';
    }
  };

  pristine.addValidator(roomAmount, validateCapacity, getCapacityMessage);
  pristine.addValidator(capacityAmount, validateCapacity, getCapacityMessage);

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {deactivatePage, activateFilters, activateForm, initValidation};
