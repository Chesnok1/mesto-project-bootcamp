const popupEdit = document.querySelector(".popup_type_edit");
const popupNew = document.querySelector(".popup_type_new");
const buttonOpenEditPopup = document.querySelector(".profile__edit-button");
const buttonCloseEditPopup = popupEdit.querySelector(".popup__close-button");
const buttonOpenNew = document.querySelector(".profile__big-button");
const buttonCloseNew = popupNew.querySelector(".popup__close-button");
const profileAuthor = document.querySelector(".profile__author");
const profileParagraph = document.querySelector(".profile__paragraph");
const formEdit = document.getElementById("formEdit");
const formNew = document.getElementById("formNew");
const authorName = document.getElementById("authorName");
const authorProfession = document.getElementById("authorProfession");
const buttonLike = document.querySelector(".place__button-like");
const cardsArea = document.querySelector(".places");
const popupBigPicture = document.querySelector(".popup_type_picture");
const popupImgContainer = document.querySelector(".popup__container_type_img");
const popupImage = document.querySelector(".popup__img");
const imgTitle = document.querySelector(".popup__img-title");
const placeImage = document.querySelector(".place__image");
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

function openPopupEdit() {
  popupEdit.classList.add("popup_opened");
}
function closePopupEdit() {
  popupEdit.classList.remove("popup_opened");
}

function openPopupNew() {
  popupNew.classList.add("popup_opened");
}
function closePopupNew() {
  popupNew.classList.remove("popup_opened");
}

buttonOpenEditPopup.addEventListener("click", openPopupEdit);
buttonCloseEditPopup.addEventListener("click", closePopupEdit);
buttonOpenNew.addEventListener("click", openPopupNew);
buttonCloseNew.addEventListener("click", closePopupNew);

/*____________________________________________________________________*/
function handleSubmitName(event) {
  event.preventDefault();
  authorName.innerText = event.target.name.value;
  authorProfession.innerText = event.target.profession.value;
  closePopupEdit();
}
formEdit.addEventListener("submit", handleSubmitName);
/*____________________________________________________________________*/

function giveLike(event) {
  const like = event.currentTarget.closest(".place__button-like");
  like.classList.toggle("place__button-like_active");
}

function createCard(obj) {
  const cardElement = document
    .querySelector("#element-template")
    .content.cloneNode(true);
  const elementImage = cardElement.querySelector(".place__image");
  cardElement.querySelector(".place__name").textContent = obj.name;
  elementImage.src = obj.link;
  elementImage.alt = obj.name;
  cardElement
    .querySelector(".place__button-like")
    .addEventListener("click", giveLike);
  cardElement
    .querySelector(".place__button-del")
    .addEventListener("click", removeCard);
  elementImage.addEventListener("click", () =>
    openCardImagePopup(elementImage)
  );
  return cardElement;
}
function renderCard(obj) {
  const cardElement = createCard(obj);
  console.log(cardsArea);
  cardsArea.prepend(cardElement);
}
function renderInitialCards() {
  initialCards.forEach(renderCard);
}
renderInitialCards();

function addNewCard(event) {
  event.preventDefault();
  const newCard = createCard({
    name: event.target.name.value,
    link: event.target.link.value,
  });
  cardsArea.prepend(newCard);
  closePopupNew();
}
formNew.addEventListener("submit", addNewCard);

function handleSubmitName(event) {
  event.preventDefault();
  authorName.innerText = event.target.name.value;
  authorProfession.innerText = event.target.profession.value;
  closePopupEdit();
}
formEdit.addEventListener("submit", handleSubmitName);

function removeCard(event) {
  const card = event.currentTarget.closest(".place");
  card.remove();
}
function openCardImagePopup(placeImage) {
  popupImage.src = placeImage.src;
  popupImage.alt = placeImage.alt;
  imgTitle.textContent = placeImage.alt;
  popupBigPicture.classList.add("popup_opened");
}
buttonCloseBigPicture.addEventListener("click", () =>
  popupBigPicture.classList.remove("popup_opened")
);
