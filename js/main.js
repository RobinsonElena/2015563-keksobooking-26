import {createRentOffers} from './data.js';
import {createRentOfferCard} from './card.js';

const canvas = document.querySelector('#map-canvas');

const similarRentOffersCards = createRentOffers();
const card = createRentOfferCard(similarRentOffersCards[0]);

canvas.append(card);
