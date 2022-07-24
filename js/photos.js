const FILE_TYPES = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooser = document.querySelector('.ad-form__field [type="file"]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload [type="file"]');
const photoPreview = document.querySelector('.ad-form__photo');

const checkFileName = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];

  if (checkFileName(file)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const createPreviewImage = (file) => {
  const previewImage = document.createElement('img');
  previewImage.src = URL.createObjectURL(file);
  previewImage.alt = 'Фотография жилья';
  previewImage.style.width = '100%';
  previewImage.style.height = '70';
  photoPreview.append(previewImage);
};


const removePreviewImage = () => {
  if (photoPreview.children.length > 0) {
    photoPreview.children[0].remove();
  }
};

photoChooser.addEventListener('change', () => {
  removePreviewImage();
  const file = photoChooser.files[0];

  if (checkFileName(file)) {
    createPreviewImage(file);
  }
});

const resetPreviewFile = () => {
  photoPreview.innerHTML = '';
  avatarPreview.src = DEFAULT_AVATAR;
};

export {resetPreviewFile};
