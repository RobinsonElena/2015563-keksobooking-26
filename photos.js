const FILE_TYPES = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

//const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarChooserElement = document.querySelector('.ad-form__field [type="file"]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoChooserElement = document.querySelector('.ad-form__upload [type="file"]');
const photoPreviewElement = document.querySelector('.ad-form__photo');

const isFile = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];

  if (isFile(file)) {
    avatarPreviewElement.src = URL.createObjectURL(file);
  }
});

photoChooserElement.addEventListener('change', () => {
  const file = photoChooserElement.files[0];

  if (isFile(file)) {
    photoPreviewElement.src = URL.createObjectURL(file);
  }
});
