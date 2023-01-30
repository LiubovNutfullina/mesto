import { openPopup } from "./utils.js";

class Card {
    constructor (name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }
    
    generateCard() {
        this._newCard = this._getTemplate();
        this._inputData();
        this._setEventListeners();

        return this._newCard;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _deleteCard() {
        this._newCard.remove();
        this._newCard = null;
    }

    _likeCard() {
        this._newCard.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _openImagePopup() {
        const popupImageElement = document.querySelector('.popup__image');
        popupImageElement.setAttribute('src', this._link);
        popupImageElement.setAttribute('alt', 'Здесь показано место ' + this._name);

        const popupTitleImageElement = document.querySelector('.popup__title-image');
        const titleElement = document.querySelector('.element__title');
        popupTitleImageElement.textContent = titleElement.textContent;

        const imagePopup = document.querySelector('.popup_image');
        openPopup(imagePopup);
    }

    _setEventListeners() {
        const trashElement = this._newCard.querySelector('.element__trash');
        trashElement.addEventListener('click', () => { this._deleteCard() });

        const likeElement = this._newCard.querySelector('.element__like');
        likeElement.addEventListener('click', () => { this._likeCard() });

        const imageElement = this._newCard.querySelector('.element__image');
        imageElement.addEventListener('click', () => { this._openImagePopup() })
    }

    _inputData() {
        const titleElement = this._newCard.querySelector('.element__title');
        titleElement.textContent = this._name;

        const imageElement = this._newCard.querySelector('.element__image');
        imageElement.src = this._link;
        imageElement.setAttribute('alt', 'Здесь показано место ' + this._name)
    }
}

export { Card };