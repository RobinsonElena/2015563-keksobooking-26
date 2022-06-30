const typeDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const createRentOfferCard = (ad) => {
  const { author, offer } = ad;

  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').innerHTML = `${offer.price} <span>₽/ночь</span>`;
  cardElement.querySelector('.popup__type').textContent = typeDictionary[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const photoElements = cardElement.querySelector('.popup__photos');
  const photoTemplate = cardElement.querySelector('.popup__photo');
  photoElements.innerHTML = '';
  offer.photos.forEach ((photo) => {
    const PhotosElement = photoTemplate.cloneNode(true);
    PhotosElement.src = photo;
    photoElements.appendChild(PhotosElement);
  });

  const descriptionElement = cardElement.querySelector('.popup__description');
  if (descriptionElement) {
    descriptionElement.textContent = offer.description;
  }
  else {
    descriptionElement.remove();
  }

  const featureElements = cardElement.querySelectorAll('.popup__feature');
  featureElements.forEach((featureElement) => {
    const isNecessary = offer.features.some(
      (feature) => featureElement.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      featureElement.remove();
    }
  });

  return cardElement;
};

export {createRentOfferCard};
