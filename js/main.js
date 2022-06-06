// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < min) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

getRandomIntInclusive(0, 10);

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/number/tofixed

const getRandomInclusive = (min, max, digits=5) => {
  if (min < 0 || max < min) {
    throw new RangeError ('Диапазон может быть только положительный, включая ноль. Введите корректный диапазон чисел');
  }
  return +(Math.floor(Math.random() * (max - min + 1)) + min).toFixed(digits); //Максимум и минимум включаются
};

getRandomInclusive(0, 10, 5);
