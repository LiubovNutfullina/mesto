import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js'
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../services/api.js';


const editPopupElement = document.querySelector('.popup_edit');
const addPopupElement = document.querySelector('.popup_add');
const avatarPopupElement = document.querySelector('.popup_avatar');


export const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
export const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
export const buttonOpenAvatarPopup = document.querySelector('.profile__avatar-button');

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '36167ecf-aae3-4842-bf73-58c3f2d4f500',
    'Content-Type': 'application/json'
  }
});

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
   avatarSelector: '.profile__avatar'
 });

export const popupWithImage = new PopupWithImage('.popup_image');
export const popupWithConfirmation = new PopupWithConfirmation('.popup_delete');

export const editProfileValidator = new FormValidator(validationConfig, editPopupElement);
export const addCardValidator = new FormValidator(validationConfig, addPopupElement);
export const avatarCardValidator = new FormValidator(validationConfig, avatarPopupElement);

export const popupWithFormEditProfile = new PopupWithForm('.popup_edit', (values) => {
  return api.editProfile(values['username'], values['working'])
    .then(res => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
      });
      
      popupWithFormEditProfile.close();
    })
    .catch(err => {
      console.log(err);
    });
 })

export const popupWithFormAvatarCard = new PopupWithForm('.popup_avatar', (values) => {
  return api.editAvatar(values['link'])
    .then(res => {
      userInfo.setAvatar(res.avatar);

      popupWithFormAvatarCard.close();
    })
    .catch((err) => {
      console.log(err);
    });
})

export function createCard(cardData, templateSelector, handleCardClick, showTrashButton, handleTrashClick, handleLikeClick) {
  const card = new Card(cardData, templateSelector, handleCardClick, showTrashButton, handleTrashClick, handleLikeClick);
  const cardElement = card.generateCard();
  return cardElement;
}