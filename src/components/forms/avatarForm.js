import { openPopup, closePopup } from "../modal";
import { patchAvatar } from "../api";
const formAvatar = document.getElementById("avatar");
const popupAvatar = document.querySelector(".popup_type_avatar-edit");
const inputAvatar = document.querySelector(".popup__avatar");
const buttonSubmitAvatar = document.querySelector(
  ".popup__button-submit-avatar"
);
const buttonOpenEditAvatar = document.querySelector(".profile__avatar-edit");
const buttonCloseEditAvatar = popupAvatar.querySelector(".popup__close-button");
buttonOpenEditAvatar.addEventListener("click", () => openPopup(popupAvatar));
buttonCloseEditAvatar.addEventListener("click", () => closePopup(popupAvatar));

function setButtonTextContant(button, content) {
  button.textContent = content;
}

const handleSubmitAvatar = (evt) => {
  evt.preventDefault(evt);
  setButtonTextContant(buttonSubmitAvatar, "Сохранение...");
  patchAvatar(`${inputAvatar.value}`)
    .then((res) => {
      profileAvatar.src = res.avatar;
      profile.avatar = res.avatar;
    })
    .then(() => {
      closePopup(popupAvatar);
    })
    .catch((res) => alert(`${res} - ошибка записи url аватара`))
    .finally(() => {
      setButtonTextContant(buttonSubmitAvatar, "Сохранить");
    });
};

formAvatar.addEventListener("submit", handleSubmitAvatar);
