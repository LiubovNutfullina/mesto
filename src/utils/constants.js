import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';

const elements = document.querySelector('.elements');
const editPopupElement = document.querySelector('.popup_edit');
const addPopupElement = document.querySelector('.popup_add');

export const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');

export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
export const validationConfig = {
    inputSelector: '.input__text',
    submitButtonSelector: '.input__button-submit',
    inputTextInvalidClass: 'input__text_invalid',
   inactiveButtonClass: 'input__button-submit_invalid',
   inputErrorSelector: '.input__text-error',
 };
 
export const userInfo = new UserInfo({
   nameSelector: '.profile__title',
   jobSelector: '.profile__subtitle',
 });
 
export const section = new Section({ items: initialCards, renderer: function(item) {
   const card = createCard(item.name, item.link, '#element-template', () => {
     popupWithImage.open(item.name, item.link)
   });

   section.addItemInFront(card);
}}, '.elements');

export const popupWithImage = new PopupWithImage('.popup_image');
 
export const editProfileValidator = new FormValidator(validationConfig, editPopupElement);
export const popupWithFormEditProfile = new PopupWithForm('.popup_edit', (values) => {
  userInfo.setUserInfo({
    name: values['username'],
    job: values['working'],
  });
 
   popupWithFormEditProfile.close();
 });
 
export const addCardValidator = new FormValidator(validationConfig, addPopupElement);
export const popupWithFormAddCard = new PopupWithForm('.popup_add', (values) => {
  const card = createCard(
    values['title'],
    values['link'],
    '#element-template',
     () => {
      popupWithImage.open(
        values['title'],
        values['link'],
       );
    }
  );

  section.addItem(card);

  popupWithFormAddCard.close();
});

function createCard(name, link, templateSelector, handleCardClick) {
  const card = new Card(name, link, templateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}