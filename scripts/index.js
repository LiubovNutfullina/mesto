const section = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content.querySelector('.element');
const editProfileButtonElement = document.querySelector('.profile__edit-button');
const addProfileButtonElement = document.querySelector('.profile__add-button');
const nameElement = document.querySelector('.profile__title');
const jobElement = document.querySelector('.profile__subtitle');
const editPopup = document.querySelector('.popup_edit');
const addPopup = document.querySelector('.popup_add');
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
const formSubmitButtonElement = document.querySelector('.input__button-submit');
const nameInputElement = document.querySelector('.input__text_type_name');
const jobInputElement = document.querySelector('.input__text_type_job');
const titleInputElement = document.querySelector('.input__text_type_title');
const linkInputElement = document.querySelector('.input__text_type_link');

// open
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

// close

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
};

function closePopupEditHandler() {
  closePopup(editPopup);
}

function closePopupAddHandler() {
  closePopup(addPopup);
}

function closePopupImageHandler() {
  closePopup(imagePopup);
}

// edit

function editPopupOpenHandler() {

  nameInputElement.value = nameElement.textContent;
  jobInputElement.value = jobElement.textContent;

  openPopup(editPopup);
}

function editPopupSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInputElement.value;
  jobElement.textContent = jobInputElement.value;

  closePopup(editPopup);
}

// add

function addPopupOpenHandler() {

  titleInputElement.value = "";
  linkInputElement.value = "";

  openPopup(addPopup);
}

function addPopupSubmitHandler(evt) {
  evt.preventDefault();

  const card = createElement(titleInputElement.value, linkInputElement.value);

  section.prepend(card);
  closePopup(addPopup);
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
})


editProfileButtonElement.addEventListener('click', editPopupOpenHandler);
addProfileButtonElement.addEventListener('click', addPopupOpenHandler);
popupCloseEditButton.addEventListener('click', closePopupEditHandler);
popupCloseAddButton.addEventListener('click', closePopupAddHandler);
popupCloseImageButton.addEventListener('click', closePopupImageHandler);
popupFormEditElement.addEventListener('submit', editPopupSubmitHandler);
popupFormAddElement.addEventListener('submit', addPopupSubmitHandler);