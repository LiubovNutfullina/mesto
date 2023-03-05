import { api } from "../utils/constants.js";

export default class Card {

    constructor (cardData, templateSelector, showTrashButton, isLiked, handlers) {
        this._cardData = cardData;
        this._showTrashButton = showTrashButton;
        this._isLiked = isLiked;
        this._templateSelector = templateSelector;
        this._handleCardClick = handlers.handleCardClick;
        this._handleTrashClick = handlers.handleTrashClick;
        this._handleLikeClick = handlers.handleLikeClick;
    }
    
    generateCard() {
        this._newCard = this._getTemplate();
        this._likeButton = this._newCard.querySelector('.element__like');
        if (this._isLiked) {
            this._likeButton.classList.add('element__like_active');
        }
        this._likeNumber = this._newCard.querySelector('.element__like-number');
        this._imageElement = this._newCard.querySelector('.element__image');
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

    _likeCard(res) {
        this._cardData = res;
        this._likeNumber.textContent = res.likes.length;
        this._likeButton.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        if (this._showTrashButton) {
            const trashElement = this._newCard.querySelector('.element__trash');
            trashElement.classList.remove('element__trash_hidden');
            trashElement.addEventListener('click', () => { this._handleTrashClick(this._deleteCard.bind(this)) });
        }

        this._likeButton.addEventListener('click', () => { this._handleLikeClick(this._likeCard.bind(this)) });
        
        this._imageElement.addEventListener('click', () => { this._handleCardClick() });
    }

    _inputData() {
        const titleElement = this._newCard.querySelector('.element__title');
        titleElement.textContent = this._cardData.name;

        this._newCard.querySelector('.element__like');
        if (this._cardData.likes.some(like => like._id === this._cardData._id)) {
            this._likeButton.classList.add('element__like_active');
        }

        this._likeNumber.textContent = this._cardData.likes.length;
        this._imageElement.src = this._cardData.link;
        this._imageElement.setAttribute('alt', 'Здесь показано место ' + this._cardData.name)
    }
}