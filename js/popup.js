import {isEscapeKey} from './util.js';

const adSuccess = document.querySelector('#success').content.querySelector('.success');
const adError = document.querySelector('#error').content.querySelector('.error');

const ALERT_SHOW_TIME = 5000;

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

const showSuccessMessage = () => {
  document.body.append(successMessage);

  function closeSuccessMessage () {
    closeMessage(successMessage);
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', onSuccessEsc);
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
    document.removeEventListener('keydown', onErrorEsc);
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

export {
  showAlert,
  showSuccessMessage,
  showErrorMessage,
};
