import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector);

        this._popupImage = this._popup.querySelector('.popup__image');
        this._titleImage = this._popup.querySelector('.popup__title-image');
    }

    open(title, src) {
        this._popupImage.setAttribute('src', src);
        this._popupImage.setAttribute('alt', 'Здесь показано место ' + title);
        this._titleImage.textContent = title;

        super.open();
    }
}