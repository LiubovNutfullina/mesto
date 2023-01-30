import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';
import { initialCards } from './cards.js';

const section = document.querySelector('.elements');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');
const popupEditProfile = document.querySelector('.popup_edit');
const popupAddCard = document.querySelector('.popup_add');
const imagePopup = document.querySelector('.popup_image');
const popupCloseEditButton = document.querySelector('.popup__close_edit');
const popupCloseAddButton = document.querySelector('.popup__close_add');
const popupCloseImageButton = document.querySelector('.popup__close_image');
const popupFormEditElement = document.querySelector('.popup__content_edit');
const popupFormAddElement = document.querySelector('.popup__content_add');
const nameInputElement = document.querySelector('.input__text_type_name');
const jobInputElement = document.querySelector('.input__text_type_job');
const titleInputElement = document.querySelector('.input__text_type_title');
const linkInputElement = document.querySelector('.input__text_type_link');
const addCardFormElement = popupAddCard.querySelector('.popup__content_form');
const editCardFormElement = popupEditProfile.querySelector('.popup__content_form');

const validationConfig = {
  inputSelector: '.input__text',
  submitButtonSelector: '.input__button-submit',
  inputTextInvalidClass: 'input__text_invalid',
  inactiveButtonClass: 'input__button-submit_invalid',
  inputErrorSelector: '.input__text-error',
};

const addCardFormValidator =  new FormValidator(validationConfig, addCardFormElement);
const editCardFormValidator =  new FormValidator(validationConfig, editCardFormElement);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();

// close

popupCloseEditButton.addEventListener('click', () => closePopup(popupEditProfile));
popupCloseAddButton.addEventListener('click', () => closePopup(popupAddCard));
popupCloseImageButton.addEventListener('click', () => closePopup(imagePopup));

// close overlay
function closeOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// edit

function editPopupOpenHandler() {  

  nameInputElement.value = nameElement.textContent;
  jobInputElement.value = jobElement.textContent;

  editCardFormValidator.removeValidationErrors();
  editCardFormValidator.enableSubmitButton();

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

  titleInputElement.value = "";
  linkInputElement.value = "";

  addCardFormValidator.removeValidationErrors();
  addCardFormValidator.disableSubmitButton();

  openPopup(popupAddCard);
}

function addPopupSubmitHandler(evt) {
  evt.preventDefault();

  const card = new Card(titleInputElement.value, linkInputElement.value, '#element-template');

  section.prepend(card.generateCard());
  closePopup(popupAddCard);
}

initialCards.forEach(function(item) {

  const card =  new Card(item.name, item.link, '#element-template');
  section.append(card.generateCard());
  
});

buttonOpenEditProfilePopup.addEventListener('click', editPopupOpenHandler);
buttonOpenAddCardPopup.addEventListener('click', addPopupOpenHandler);
popupFormEditElement.addEventListener('submit', editPopupSubmitHandler);
popupFormAddElement.addEventListener('submit', addPopupSubmitHandler);
popupEditProfile.addEventListener('mousedown', closeOverlay);
popupAddCard.addEventListener('mousedown', closeOverlay);
imagePopup.addEventListener('mousedown', closeOverlay);