import { toggleButtonState } from "./validate";
export const popup = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNew = document.querySelector(".popup_type_new");
export const popupAvatar = document.querySelector(
  ".popup_type_avatar-edit"
); /* */
export const authorName = document.getElementById("authorName");
export const authorProfession = document.getElementById("authorProfession");
const profileAvatar = document.querySelector(".profile__avatar");
export const popupBigPicture = document.querySelector(".popup_type_picture");
export const inputAll = document.querySelectorAll(".popup__input");
const inputAvatar = document.querySelector(".pupup__avatar");

export const closeClickOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};
export const closeKeyEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(popupEdit);
    closePopup(popupNew);
    closePopup(popupAvatar);
    closeCardImagePopup();
  }
};

export const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inpuElement) => {
    inpuElement.addEventListener("input", () => {
      isValid(formElement, inpuElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// function validation() {
//   inputAll.forEach((inputElement) => {
//     checkValidity(inputElement);
//   });
//   toggleButton();
// }
export function openPopup(name) {
  name.classList.add("popup_opened");
  document.addEventListener("keydown", closeKeyEsc);
  popup.forEach((item) => item.addEventListener("click", closeClickOverlay));
  enableValidation();
}
export function closePopup(name) {
  name.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeKeyEsc);
  popup.forEach((item) => item.removeEventListener("click", closeClickOverlay));
}

export function handleSubmitName(event) {
  event.preventDefault();
  authorName.innerText = event.target.name.value;
  authorProfession.innerText = event.target.profession.value;
  closePopup(popupEdit);
}
export function handleSubmitAvatar(event) {
  event.preventDefault();
  inputAvatar.src = profileAvatar.src;
  closePopup(popupAvatar);
}

export function closeCardImagePopup() {
  popupBigPicture.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeKeyEsc);
  popup.forEach((item) => item.removeEventListener("click", closeClickOverlay));
}
