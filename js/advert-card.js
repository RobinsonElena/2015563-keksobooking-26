const typeDictionary = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createRentOfferCard = (advert) => {
  const {author, offer} = advert;
  const card = cardTemplate.cloneNode(true);
  const photoList = card.querySelector('.popup__photos');
  const photoTemplate = card.querySelector('.popup__photo');
  const description = card.querySelector('.popup__description');
  const featureContainer = card.querySelector('.popup__features');
  const featureList = card.querySelectorAll('.popup__feature');

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  card.querySelector('.popup__type').textContent = typeDictionary[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (offer.photos && offer.photos.length > 0) {
    photoList.innerHTML = '';
    offer.photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photoList.appendChild(photoElement);
    });
  } else {
    photoList.remove();
  }

  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.remove();
  }

  if (offer.features && offer.features.length > 0) {
    featureList.forEach((featureElement) => {
      offer.features.some((feature) => featureElement.classList.contains(`popup__feature--${feature}`));
    });
  } else {
    featureContainer.remove();
  }

  return card;
};

export {
  createRentOfferCard,
  typeDictionary
};
