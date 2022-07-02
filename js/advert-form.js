import {toggleElements} from './util.js';

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

export {deactivatePage, activateFilters, activateForm};
