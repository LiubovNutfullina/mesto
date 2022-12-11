function showInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputTextInvalidClass);
    errorElement.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputTextInvalidClass);
    errorElement.textContent = "";
}

function isValid(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, config);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function disableSubmitButton(formElement, config) {
    const button = formElement.querySelector(config.submitButtonSelector);
    button.classList.add(validationConfig.inactiveButtonClass);
    button.disabled = true;
}

function enableSubmitButton(formElement, config) {
    const button = formElement.querySelector(config.submitButtonSelector);
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.disabled = false;
}

function removeValidationErrors(formElement, config) {
  const inputErrorElements = Array.from(formElement.querySelectorAll(config.inputErrorSelector));
  
  inputErrorElements.forEach(function(errorElement) {
    errorElement.textContent = "";
  });
  
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach(function(inputElement) {
    inputElement.classList.remove(config.inputTextInvalidClass);
  });
}

function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            isValid(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
}
  
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(function(formElement) {
    setEventListeners(formElement, config);
 })
}