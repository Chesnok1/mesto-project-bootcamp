import { profile } from "../..";
import { addLike, removeLike } from "../api";
export const setLikesByCard = (card, count) => {
  const likeNumber = card.querySelector(".place__like-number");
  likeNumber.textContent = count;
};
export function toggleLike(evt) {
  const cardEl = evt.target.closest(".place");
  const cardCounter = cardEl.querySelector(".place__like-number");
  if (evt.target.classList.contains("place__button-like_active")) {
    removeLike(cardEl.id)
      .then((res) => {
        checkLikesNumber(res._id, res.likes.length, cardCounter, cardEl.id);
        evt.target.classList.remove("place__button-like_active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    addLike(cardEl.id)
      .then((res) => {
        checkLikesNumber(res._id, res.likes.length, cardCounter, cardEl.id);
        evt.target.classList.add("place__button-like_active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}
export function verifyLikesByUser(card, likes) {
  if (
    likes &&
    Array.isArray(likes) &&
    likes.find((like) => like._id === profile._id)
  ) {
    const likeElement = card.querySelector(".place__button-like");
    likeElement.classList.toggle("place__button-like_active");
  }
}
function checkLikesNumber(id, numbers, counter, cardId) {
  if (cardId === id) {
    counter.textContent = numbers;
  }
}
