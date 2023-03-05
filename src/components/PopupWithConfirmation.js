import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._submitButton = this._popup.querySelector('.popup__button-submit');
    }

    open(submitCallback) {
        super.open();
        this._callback = submitCallback;
    }

    close() {
        super.close();
        this._callback = null;
    }

    setEventListeners() {
        super.setEventListeners();

        this._submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._callback().then(() => {
                this.close();
            });
        });
    }
}

