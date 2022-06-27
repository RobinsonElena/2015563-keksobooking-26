import {
  createRentOffers
} from './data.js';

const createRentOffersCards = () => {
  const similarRentOffersCards = createRentOffers();
  const cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  const similarListFragment = document.createDocumentFragment();
  const canvas = document.querySelector('#map-canvas');

  similarRentOffersCards.forEach(({ author, offer }) => {
    const rentOffersCard = cardTemplate.cloneNode(true);
    rentOffersCard.querySelector('.popup__avatar').src = author.avatar;
    rentOffersCard.querySelector('.popup__title').textContent = offer.title;
    rentOffersCard.querySelector('.popup__text--address').textContent = offer.address;
    rentOffersCard.querySelector('.popup__text--price').textContent = `${offer.title} ₽/ночь`;
    rentOffersCard.querySelector('.popup__type').textContent = offer.type;
    rentOffersCard.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    rentOffersCard.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    rentOffersCard.querySelector('.popup__description').textContent = offer.description;
    rentOffersCard.querySelector('.popup__features').textContent = offer.features;
    rentOffersCard.querySelector('.popup__description').textContent = offer.description;

    if (offer.description) {
      rentOffersCard.textContent = offer.description;
    } else {
      rentOffersCard.offer.description.remove();
    }

    similarListFragment.append(rentOffersCard);
  });

  canvas.append(similarListFragment);
};

export {createRentOffersCards};
