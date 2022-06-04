// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  if (min >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  } else {
    return 'Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел';
  }
}

getRandomIntInclusive(0, 10);

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/number/tofixed

function getRandomInclusive(min, max, digits) {
  if (min >= 0 && max > min) {
    return (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(digits); //Максимум и минимум включаются
  } else {
    return 'Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел';
  }
}

getRandomInclusive(0, 10, 5);
