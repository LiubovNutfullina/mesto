import './index.css';
import { 
  section,
  editProfileValidator,
  addCardValidator,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  popupWithFormEditProfile,
  popupWithFormAddCard,
  popupWithImage,
  userInfo,
} from '../utils/constants';


section.renderItems();

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
buttonOpenEditProfilePopup.addEventListener('click', editPopupOpenHandler);
buttonOpenAddCardPopup.addEventListener('click', addPopupOpenHandler);
popupWithFormEditProfile.setEventListeners();
popupWithFormAddCard.setEventListeners();
popupWithImage.setEventListeners();

function editPopupOpenHandler() {  
  const { name, job } = userInfo.getUserInfo();
  popupWithFormEditProfile.setInputValues({ username: name, working: job });

  editProfileValidator.enableSubmitButton();
  editProfileValidator.removeValidationErrors();
  popupWithFormEditProfile.open();
}

function addPopupOpenHandler() {
  addCardValidator.disableSubmitButton();
  addCardValidator.removeValidationErrors();
  popupWithFormAddCard.open();
}