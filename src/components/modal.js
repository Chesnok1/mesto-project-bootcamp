import { checkValidity } from "./utils";
import { toggleButton } from "./validate";
export const popup = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNew = document.querySelector(".popup_type_new");
const authorName = document.getElementById("authorName");
const authorProfession = document.getElementById("authorProfession");
export const popupBigPicture = document.querySelector(".popup_type_picture");
export const inputAll = document.querySelectorAll(".popup__input");
export const closeClickOverlay = (evt) => {
  console.log(evt.target);
  console.log(evt.currentTarget);
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};
export const closeKeyEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(popupEdit);
    closePopup(popupNew);
    closeCardImagePopup();
  }
};

function validation() {
  inputAll.forEach((inputElement) => {
    checkValidity(inputElement);
  });
  toggleButton();
}
export function openPopup(name) {
  name.classList.add("popup_opened");
  document.addEventListener("keydown", closeKeyEsc);
  popup.forEach((item) => item.addEventListener("click", closeClickOverlay));
  validation();
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
export function closeCardImagePopup() {
  popupBigPicture.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeKeyEsc);
  popup.forEach((item) => item.removeEventListener("click", closeClickOverlay));
}
