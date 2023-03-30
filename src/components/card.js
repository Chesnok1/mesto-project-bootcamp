import { setLikesByCard, verifyLikesByUser, toggleLike } from "./likes";
import { profile, renderCard } from "..";
import { deleteCard, getCards } from "./api";
import { closePopup, openPopup } from "./modal";
export function createCard(obj, openCardImagePopup) {
  if (obj) {
    const cardElement = document
      .querySelector("#element-template")
      .content.cloneNode(true);
    const elementImage = cardElement.querySelector(".place__image");
    cardElement.querySelector(".place__name").textContent = obj.name;
    cardElement.querySelector(".place").id = obj._id;
    elementImage.src = obj.link;
    elementImage.alt = obj.name;
    cardElement
      .querySelector(".place__button-like")
      .addEventListener("click", toggleLike);
    if (obj.owner._id === profile._id) {
      cardElement
        .querySelector(".place__button-del")
        .addEventListener("click", () => openTrashPopup(obj._id));
    } else {
      cardElement.querySelector(".place__button-del").remove();
    }

    setLikesByCard(cardElement, obj.likes?.length ? obj.likes.length : 0);
    verifyLikesByUser(cardElement, obj.likes);
    elementImage.addEventListener("click", () =>
      openCardImagePopup(elementImage)
    );

    return cardElement;
  }
  return;
}
export const AreYouShurePopup = document.querySelector(
  ".popup_type_delete-confirm"
);
const buttonShureConfirm = AreYouShurePopup.querySelector(
  ".popup__button-submit-card"
);
const buttonShureClose = AreYouShurePopup.querySelector(".popup__close-button");
buttonShureClose.addEventListener("click", closeTrashPopup);
buttonShureConfirm.addEventListener("click", shureDeleteTrashPopup);

function openTrashPopup(cardId) {
  openPopup(AreYouShurePopup);
  AreYouShurePopup.id = cardId;
}
function shureDeleteTrashPopup() {
  // document.querySelector(".places").innerHTML = "";
  deleteCard(AreYouShurePopup.id).then(() => {
    getCards().then((cards) => {
      cards.reverse().forEach(renderCard);
    });
  });
  closeTrashPopup();
}
function closeTrashPopup() {
  closePopup(AreYouShurePopup);
}
