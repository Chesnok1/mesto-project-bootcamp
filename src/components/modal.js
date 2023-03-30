import { enableValidation } from "./validate";
import { validitySettings } from "../index";
import { changeUser } from "./api";
import { AreYouShurePopup } from "./card";
export const popups = document.querySelectorAll(".popup");
export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNew = document.querySelector(".popup_type_new");
export const popupAvatar = document.querySelector(".popup_type_avatar-edit");
export const authorName = document.getElementById("authorName");
export const authorProfession = document.getElementById("authorProfession");
export const popupBigPicture = document.querySelector(".popup_type_picture");
export const inputAlls = document.querySelectorAll(".popup__input");

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
    closePopup(popupBigPicture);
    closePopup(AreYouShurePopup);
  }
};

export function openPopup(name) {
  name.classList.add("popup_opened");
  document.addEventListener("keydown", closeKeyEsc);
  popups.forEach((item) => item.addEventListener("click", closeClickOverlay));
  enableValidation(validitySettings);
}
export function closePopup(name) {
  name.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeKeyEsc);
  popups.forEach((item) =>
    item.removeEventListener("click", closeClickOverlay)
  );
}

export function handleProfileFormSubmit(event) {
  event.preventDefault();
  authorName.innerText = event.target.name.value;
  authorProfession.innerText = event.target.profession.value;
  closePopup(popupEdit);
  changeUser(event.target.name.value, event.target.profession.value);
}
