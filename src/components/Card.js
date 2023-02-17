export default class Card {
    constructor (name, link, templateSelector, handleCardClick) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    
    generateCard() {
        this._newCard = this._getTemplate();
        this._likeButton = this._newCard.querySelector('.element__like');
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

    _likeCard() {
        this._likeButton.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        const trashElement = this._newCard.querySelector('.element__trash');
        trashElement.addEventListener('click', () => { this._deleteCard() });

        this._likeButton.addEventListener('click', () => { this._likeCard() });

        
        this._imageElement.addEventListener('click', () => { this._handleCardClick() })
    }

    _inputData() {
        const titleElement = this._newCard.querySelector('.element__title');
        titleElement.textContent = this._name;

        this._imageElement.src = this._link;
        this._imageElement.setAttribute('alt', 'Здесь показано место ' + this._name)
    }
}