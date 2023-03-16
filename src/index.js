import "./styles/index.css";
import { createCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  popupEdit,
  popupNew,
  handleSubmitName,
  popup,
  closeClickOverlay,
  closeCardImagePopup,
  closeKeyEsc,
  popupBigPicture,
  inputAll,
} from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
const buttonOpenEditPopup = document.querySelector(".profile__edit-button");
const buttonCloseEditPopup = popupEdit.querySelector(".popup__close-button");
const buttonOpenNew = document.querySelector(".profile__big-button");
const buttonCloseNew = popupNew.querySelector(".popup__close-button");
const formEdit = document.getElementById("formEdit");
const formNew = document.getElementById("formNew");
const cardsArea = document.querySelector(".places");
const popupImage = document.querySelector(".popup__img");
const imgTitle = document.querySelector(".popup__img-title");
const buttonCloseBigPicture = document.querySelector("#close-big-picture");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// inputAll.forEach((inputElement) => {
//   inputElement.addEventListener("input", () => {
//     checkValidity(inputElement);
//     toggleButton();
//   });
// });
buttonOpenEditPopup.addEventListener("click", () => openPopup(popupEdit));
buttonCloseEditPopup.addEventListener("click", () => closePopup(popupEdit));
buttonOpenNew.addEventListener("click", () => openPopup(popupNew));
buttonCloseNew.addEventListener("click", () => closePopup(popupNew));

formEdit.addEventListener("submit", handleSubmitName);

function renderCard(obj) {
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
  const newCard = createCard(
    {
      name: event.target.name.value,
      link: event.target.link.value,
    },
    openCardImagePopup
  );
  cardsArea.prepend(newCard);
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
  popup.forEach((item) => item.addEventListener("click", closeClickOverlay));
}

buttonCloseBigPicture.addEventListener("click", () => closeCardImagePopup());

// const setEventListeners = (formElement) => {
//   const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
//   const buttonElement = formElement.querySelector(".popup__button");
//   toggleButtonState(inputList, buttonElement);
// };

renderCard();
/*_______________________________________*/
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
