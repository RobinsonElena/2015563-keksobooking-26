const GET_URL = 'https://26.javascript.pages.academy/keksobooking/ata';
const SET_URL = 'https://26.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(GET_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось загрузить объявления. Попробуйте еще раз');
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(onError);
};

const setData = (onSuccess, onError, body) => {
  fetch(SET_URL,
    {
      metod: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Не удалось отправить форму. Попробуйте еще раз');
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(onError);
};

export {getData,setData};
