const isEscapeKey = (evt) => evt.key ==='Escape';

const toggleElements = (elements, value) => {
  elements.forEach((element) => {
    element.disabled = value;
  });
};

export {
  toggleElements,
  isEscapeKey,
};
