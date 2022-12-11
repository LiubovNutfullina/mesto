const section = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');
const popupEditProfile = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const imagePopup = document.querySelector('.popup_image');
const imagePopupContainer = document.querySelector('.popup__container_image');
const popupCloseEditButton = document.querySelector('.popup__close_edit');
const popupCloseAddButton = document.querySelector('.popup__close_add');
const popupCloseImageButton = document.querySelector('.popup__close_image');
const popupFormEditElement = document.querySelector('.popup__content_edit');
const popupFormAddElement = document.querySelector('.popup__content_add');
const popupFormImageElement = document.querySelector('.popup__content_image');
const popupImageElement = document.querySelector('.popup__image');
const popupTitleElement = document.querySelector('.popup__title');
const popupTitleImageElement = document.querySelector('.popup__title-image');
const popupInputsContainerElement = document.querySelector('.input');
const nameInputElement = document.querySelector('.input__text_type_name');
const nameInputErrorElement = document.querySelector(`.${nameInputElement.id}-error`);
const jobInputElement = document.querySelector('.input__text_type_job');
const jobInputErrorElement = document.querySelector(`.${jobInputElement.id}-error`);
const titleInputElement = document.querySelector('.input__text_type_title');
const titleInputErrorElement = document.querySelector(`.${titleInputElement.id}-error`);
const linkInputElement = document.querySelector('.input__text_type_link');
const linkInputErrorElement = document.querySelector(`.${linkInputElement.id}-error`);

const validationConfig = {
  formSelector: '.popup__content_form',
  inputSelector: '.input__text',
  submitButtonSelector: '.input__button-submit',
  inputTextInvalidClass: 'input__text_invalid',
  inactiveButtonClass: 'input__button-submit_invalid',
  inputErrorSelector: '.input__text-error',
};

enableValidation(validationConfig);

// open
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handlePopupEscButton);
}

// close

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlePopupEscButton);
};

function closePopupEditHandler() {
  closePopup(popupEditProfile);
}

function closePopupAddHandler() {
  closePopup(popupAddCard);
}

function closePopupImageHandler() {
  closePopup(imagePopup);
}

// close esc

function handlePopupEscButton(evt) {
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

// close overlay
function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// edit

function editPopupOpenHandler() {
  const popupEditForm = popupEditProfile.querySelector('.popup__content');
  removeValidationErrors(popupEditForm, validationConfig);
  
  nameInputElement.value = nameElement.textContent;
  jobInputElement.value = jobElement.textContent;

  enableSubmitButton(popupEditProfile, validationConfig);

  openPopup(popupEditProfile);
}

function editPopupSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInputElement.value;
  jobElement.textContent = jobInputElement.value;

  closePopup(popupEditProfile);
}

// add

function addPopupOpenHandler() {
  const popupAddCardForm = popupAddCard.querySelector('.popup__content');
  removeValidationErrors(popupAddCardForm, validationConfig);
  
  titleInputElement.value = "";
  linkInputElement.value = "";

  disableSubmitButton(popupAddCard, validationConfig);

  openPopup(popupAddCard);
}

function addPopupSubmitHandler(evt) {
  evt.preventDefault();

  const card = createElement(titleInputElement.value, linkInputElement.value);

  section.prepend(card);
  closePopup(popupAddCard);
}

function createElement(name, link) {

  const element = elementTemplate.cloneNode(true);
  const elementTitle = element.querySelector('.element__title');
  const elementImage = element.querySelector('.element__image');
  const elementTrash = element.querySelector('.element__trash');
  const elementLike = element.querySelector('.element__like');
  const alt = 'Здесь показано место ' + name;
  
  elementImage.setAttribute('src', link);
  elementImage.setAttribute('alt', alt);
  elementImage.addEventListener('click', function() {
    popupImageElement.setAttribute('src', link);
    popupImageElement.setAttribute('alt', alt);
    popupTitleImageElement.textContent = elementTitle.textContent;
    openPopup(imagePopup);
  });
  elementTrash.addEventListener('click', function() {
    element.remove();
  })
  elementLike.addEventListener('click', function() {
    elementLike.classList.toggle('element__like_active');
  });
  elementTitle.textContent = name;
  return element;
}

initialCards.forEach(function(item) {
  const card = createElement(item.name, item.link);
  section.append(card);
});

buttonOpenEditProfilePopup.addEventListener('click', editPopupOpenHandler);
buttonOpenAddCardPopup.addEventListener('click', addPopupOpenHandler);
popupCloseEditButton.addEventListener('click', closePopupEditHandler);
popupCloseAddButton.addEventListener('click', closePopupAddHandler);
popupCloseImageButton.addEventListener('click', closePopupImageHandler);
popupFormEditElement.addEventListener('submit', editPopupSubmitHandler);
popupFormAddElement.addEventListener('submit', addPopupSubmitHandler);
popupEditProfile.addEventListener('click', closeOverlay);
popupAddCard.addEventListener('click', closeOverlay);
imagePopup.addEventListener('click', closeOverlay);
