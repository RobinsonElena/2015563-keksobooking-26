const adSuccess = document.querySelector('#success').content.querySelector('.success');
const adError = document.querySelector('#error').content.querySelector('.error');

const  ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const successMessage = adSuccess.cloneNode(true);
const errorMessage = adError.cloneNode(true);

const closeMessage = (element) => {
  element.remove();
};

const isEscapeKey = (evt) => evt.key ==='Escape';

const showSuccessMessage = () => {
  document.body.append(successMessage);

  function closeSuccessMessage () {
    closeMessage(successMessage);
    document.removeEventListener('click', closeSuccessMessage);
  }

  function onSuccessEsc (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccessMessage();
    }
  }
  document.addEventListener('keydown', onSuccessEsc);
  document.addEventListener('click', closeSuccessMessage);
};

const showErrorMessage = () => {
  document.body.append(errorMessage);

  function closeErrorMessage () {
    closeMessage(errorMessage);
    document.removeEventListener('click', closeErrorMessage);
  }

  function onErrorEsc (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeErrorMessage();
    }
  }

  document.addEventListener('keydown', onErrorEsc);
  document.addEventListener('click', closeErrorMessage);
};

const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b <= a) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomFloat = (min, max, digits = 5) => {
  if (min < 0 || max <= min) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  return +(Math.random() * (max - min) + min).toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getShuffledArray = (elements) => {
  const newArray = elements.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const toggleElements = (elements, value) => {
  elements.forEach((element) => {
    element.disabled = value;
  });
};

export {
  getRandomPositiveInteger,
  getRandomFloat,
  getRandomArrayElement,
  getShuffledArray,
  toggleElements,
  showAlert,
  showSuccessMessage,
  showErrorMessage,
};
