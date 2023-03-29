const formElement = document.querySelector(".popup__form");
const inputElement = formElement.querySelector(".popup__input");

const showInputError = (formElement, inputElement, settings) => {
  const spanError = formElement.querySelector(`#error-${inputElement.id}`);
  spanError.textContent = inputElement.validationMessage;
  spanError.classList.add(settings.errorClass);
  inputElement.classList.add(settings.inpputErrorClass);
};

const hideInputError = (formElement, inputElement, settings) => {
  console.log("hideInputError.formElement", formElement);
  console.log("hideInputError.inputElement", inputElement);
  const formError = formElement.querySelector(`#error-${inputElement.id}`);
  console.log("hideInputError.formError", formError);
  inputElement.classList.remove(settings.errorClass);
  formError.classList.remove(settings.inpputErrorClass);
  formError.textContent = "";
};

const isValid = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};
const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList, settings)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
function resetInputErrors(formElement, settings) {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, settings)
  );
}

export { enableValidation, resetInputErrors, toggleButtonState };
