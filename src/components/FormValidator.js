export class FormValidator {
    constructor(validationConfig, formElement){
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    }

    removeValidationErrors() {
        const inputErrorElements = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputErrorSelector));
        
        inputErrorElements.forEach((errorElement) => {
          errorElement.textContent = "";
        });
        
        this._inputList.forEach((inputElement) => {
          inputElement.classList.remove(this._validationConfig.inputTextInvalidClass);
        });
    }
    
    enableSubmitButton() {
        this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    disableSubmitButton() {
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _setEventListeners() {
    
        this._toggleButtonState();
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            });
        });
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.disableSubmitButton();
        } else {
            this.enableSubmitButton();
        }
    }
    
    _isValid(inputElement) {
        if (inputElement.validity.valid) {
            this._hideInputError(inputElement);
        } else {
            this._showInputError(inputElement);
        }
    }

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._validationConfig.inputTextInvalidClass);
        errorElement.textContent = inputElement.validationMessage;
    }
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._validationConfig.inputTextInvalidClass);
        errorElement.textContent = "";
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    }
}