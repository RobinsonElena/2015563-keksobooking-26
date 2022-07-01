const filterElement = document.querySelector('.map__filters');
const filterList = document.querySelectorAll('.map__filters select, .map__filters fieldset');
const formElement = document.querySelector('.ad-form');
const formList = document.querySelectorAll('.ad-form');

const deactivatePage = () => {
  filterElement.classList.add('map__filters--disabled');
  filterElement.disabled = true;
  //filterList.forEach((element) => {
  //  element.disabled = true;
  //});
  formElement.classList.add('ad-form--disabled');
  formList.forEach((element) => {
    element.disabled = true;
  });
};

const activatePage = () => {
  filterElement.classList.remove('map__filters--disabled');
  filterList.forEach((element) => {
    element.disabled = false;
  });
  formElement.classList.remove('ad-form--disabled');
  formList.forEach((element) => {
    element.disabled = false;
  });
};

export {deactivatePage, activatePage};
