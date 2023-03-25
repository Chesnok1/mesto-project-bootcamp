import "./styles/index.css";
import { createCard } from "./components/card.js";
import {
  openPopup,
  closePopup,
  popupEdit,
  popupNew,
  popupAvatar,
  handleSubmitName,
  handleSubmitAvatar,
  popup,
  closeClickOverlay,
  closeCardImagePopup,
  closeKeyEsc,
  popupBigPicture,
  inputAll,
  authorName,
  authorProfession,
} from "./components/modal.js";
import {
  enableValidation,
  resetInputErrors,
  toggleButtonState,
} from "./components/validate.js";
import {
  getInitialCards,
  getUser,
  config,
  addUser,
  addCard,
  addLike,
  removeLike,
  addAvatar,
  deleteCard,
} from "./components/api";
const buttonOpenEditPopup = document.querySelector(".profile__edit-button");
const buttonCloseEditPopup = popupEdit.querySelector(".popup__close-button");
const buttonOpenNew = document.querySelector(".profile__big-button");
const buttonOpenEditAvatar = document.querySelector(
  ".profile__avatar-edit"
); /*____*/
const buttonCloseNew = popupNew.querySelector(".popup__close-button");
const buttonCloseEditAvatar = popupAvatar.querySelector(".popup__close-button");
const formEdit = document.getElementById("formEdit");
const formNew = document.getElementById("formNew");
const formAvatar = document.getElementById("avatar"); /*___*/
const cardsArea = document.querySelector(".places");
const authorInput = document.querySelector(".popup__form-name");
const professionInput = document.querySelector(".popup__profession");
const popupImage = document.querySelector(".popup__img");
const profileAvatar = document.querySelector(".profile__avatar");
const imgTitle = document.querySelector(".popup__img-title");
const buttonCloseBigPicture = document.querySelector("#close-big-picture");
const initialCards = [];

inputAll.forEach((inputElement) => {
  inputElement.addEventListener("input", () => {
    checkValidity(inputElement);
    toggleButton();
  });
});
buttonOpenEditPopup.addEventListener("click", () => openPopup(popupEdit));
buttonCloseEditPopup.addEventListener("click", () => closePopup(popupEdit));
buttonOpenNew.addEventListener("click", () => openPopup(popupNew));
buttonCloseNew.addEventListener("click", () => closePopup(popupNew));
buttonOpenEditAvatar.addEventListener("click", () => openPopup(popupAvatar));
buttonCloseEditAvatar.addEventListener("click", () => closePopup(popupAvatar));
formEdit.addEventListener("submit", handleSubmitName);
formAvatar.addEventListener("submit", handleSubmitAvatar);

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
const validitySettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validitySettings);

Promise.all([getUser(), getInitialCards()])
  .then(([userData, cards]) => {
    authorName.id = userData._id;
    authorName.textContent = userData.name;
    authorProfession.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    authorInput.value = userData.name;
    professionInput.value = userData.about;
    cards.reverse().forEach(renderCard);
    console.log(cards.reverse());
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
