const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const editProfileButtonElement = document.querySelector('.profile__edit-button');
const popupContentElement = popupElement.querySelector('.popup__content');

function openPopup() {
    const nameElement = document.querySelector('.profile__title');
    const jobElement = document.querySelector('.profile__subtitle');
    const nameInputElement = document.querySelector('.input__text_type_name');
    const jobInputElement = document.querySelector('.input__text_type_job');

    nameInputElement.value = nameElement.textContent;
    jobInputElement.value = jobElement.textContent;

    popupElement.classList.add('popup_is-opened');
}

function closePopup() {
    popupElement.classList.remove('popup_is-opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    const nameInputElement = document.querySelector('.input__text_type_name');
    const jobInputElement = document.querySelector('.input__text_type_job');

    document.querySelector('.profile__title').textContent = nameInputElement.value;
    document.querySelector('.profile__subtitle').textContent = jobInputElement.value;

    closePopup();
}

editProfileButtonElement.addEventListener('click', openPopup);
popupContentElement.addEventListener('submit', formSubmitHandler);
popupCloseButtonElement.addEventListener('click', closePopup);