import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupSelector, callback) {
        super(popupSelector);
        this._formValues = {};
        this._popupForm = this._popup.querySelector('.popup__content_form');
        this._callback = callback;
        this._inputs = Array.from(this._popupForm.querySelectorAll('.input__text'));
    }

    getValue(id) {
        return this._formValues[id];
    }

    setInputValues(data) {
        this._inputs.forEach(input => input.value = data[input.id]);
    }

    close() {
        super.close();
        this._popupForm.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._getInputValues();
            this._callback(this._formValues);
        });
    }

    _getInputValues() {
        this._inputs.forEach(input => this._formValues[input.id] = input.value);
    }
}