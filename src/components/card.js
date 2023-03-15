export function createCard(obj, openCardImagePopup) {
  if (obj) {
    const cardElement = document
      .querySelector("#element-template")
      .content.cloneNode(true);
    const elementImage = cardElement.querySelector(".place__image");
    cardElement.querySelector(".place__name").textContent = obj.name;
    elementImage.src = obj.link;
    elementImage.alt = obj.name;
    cardElement
      .querySelector(".place__button-like")
      .addEventListener("click", toggleLike);
    cardElement
      .querySelector(".place__button-del")
      .addEventListener("click", removeCard);
    elementImage.addEventListener("click", () =>
      openCardImagePopup(elementImage)
    );
    return cardElement;
  }
  return;
}

function removeCard(event) {
  const card = event.currentTarget.closest(".place");
  card.remove();
}
function toggleLike(event) {
  const like = event.currentTarget.closest(".place__button-like");
  like.classList.toggle("place__button-like_active");
}
