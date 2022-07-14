import {initMap} from './map.js';
import {deactivatePage, initValidation, createSlider} from './advert-form.js';
import {getData} from './api.js';

const ADS_COUNT = 10;

getData((ads) => {
  initMap(ads.slice(0, ADS_COUNT));
});

deactivatePage();
initValidation();
createSlider();
