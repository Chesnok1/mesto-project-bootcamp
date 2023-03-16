const popupForm = document.querySelector(".popup__form");
const formInput = popupForm.querySelector(".popup__input");

const showInputError = (popupForm, formInput, errorMessage) => {
  const spanError = popupForm.querySelector(`#error-${formInput.id}`);
  formInput.classList.add("popup__form_type_error");
  spanError.textContent = errorMessage;
  spanError.classList.add("popup__error-message_type_visible");
};

const hideInputError = (popupForm, formInput) => {
  const formError = popupForm.querySelector(`#error-${formInput.id}`);
  formInput.classList.remove("popup__form_type_error");
  formError.classList.remove("popup__error-message_type_visible");
  formError.textContent = "";
};
export const isValid = (popupForm, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(popupForm, formInput, formInput.validationMessage);
  } else {
    hideInputError(popupForm, formInput);
  }
};
export const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.disabled = false;
  }
};

export const setEventListeners = (popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll(".popup__input"));
  const buttonElement = popupForm.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(popupForm, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((popupForm) => {
    popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(popupForm);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};
