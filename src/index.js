import "./styles/index.css";
import "./components/forms/avatarForm";
import { createCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  popupEdit,
  popupNew,
  handleProfileFormSubmit,
  popups,
  closeClickOverlay,
  closeKeyEsc,
  popupBigPicture,
  authorName,
  authorProfession,
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import { getUser, addCard, getCards } from "./components/api";
const buttonOpenEditPopup = document.querySelector(".profile__edit-button");
const buttonCloseEditPopup = popupEdit.querySelector(".popup__close-button");
const buttonOpenNew = document.querySelector(".profile__big-button");
const buttonCloseNew = popupNew.querySelector(".popup__close-button");
const formEdit = document.getElementById("formEdit");
const formNew = document.getElementById("formNew");
const cardsArea = document.querySelector(".places");
const authorInput = document.querySelector(".popup__form-name");
const professionInput = document.querySelector(".popup__profession");
const popupImage = document.querySelector(".popup__img");
export const profileAvatar = document.querySelector(".profile__avatar");
const imgTitle = document.querySelector(".popup__img-title");
const buttonCloseBigPicture = document.querySelector("#close-big-picture");
const initialCards = [];
export let profile = null;
buttonOpenEditPopup.addEventListener("click", () => openPopup(popupEdit));
buttonCloseEditPopup.addEventListener("click", () => closePopup(popupEdit));
buttonOpenNew.addEventListener("click", () => openPopup(popupNew));
buttonCloseNew.addEventListener("click", () => closePopup(popupNew));
buttonCloseBigPicture.addEventListener("click", () =>
  closePopup(popupBigPicture)
);
formEdit.addEventListener("submit", handleProfileFormSubmit);

export function renderCard(obj) {
  const cardElement = createCard(obj, openCardImagePopup);
  obj && cardsArea.prepend(cardElement);
}
function renderInitialCards() {
  initialCards.forEach((i) => {
    renderCard(i);
  });
}
renderInitialCards();

function addNewCard(event) {
  event.preventDefault();
  addCard({
    name: event.target.name.value,
    link: event.target.link.value,
  }).then(() => {
    getCards().then((cards) => {
      cards.reverse().forEach(renderCard);
    });
  });
  // document.querySelector(".places").innerHTML = "";
  closePopup(popupNew);
  event.target.reset();
}
formNew.addEventListener("submit", addNewCard);

function openCardImagePopup(placeImage) {
  popupImage.src = placeImage.src;
  popupImage.alt = placeImage.alt;
  imgTitle.textContent = placeImage.alt;
  popupBigPicture.classList.add("popup_opened");
  document.addEventListener("keydown", closeKeyEsc);
  popups.forEach((item) => item.addEventListener("click", closeClickOverlay));
}

renderCard();

export const validitySettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validitySettings);

Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    profile = userData;
    authorName.id = userData._id;
    authorName.textContent = userData.name;
    authorProfession.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    authorInput.value = userData.name;
    professionInput.value = userData.about;
    cards.reverse().forEach(renderCard);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
