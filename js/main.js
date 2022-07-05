import {createRentOffers} from './data.js';
import {createRentOfferCard} from './advert-card.js';
import {activateFilters, activateForm, initValidation} from './advert-form.js';

const canvas = document.querySelector('#map-canvas');

const similarRentOffersCards = createRentOffers();
const card = createRentOfferCard(similarRentOffersCards[0]);

canvas.append(card);

//deactivatePage();
activateFilters();
activateForm();
initValidation();
