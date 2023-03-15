export function showError(inputElement, errorMessage) {
  const spanElementSelector = `#error-${inputElement.id}`;
  const spanElement = document.querySelector(spanElementSelector);
  inputElement.classList.add("popup__input_type_invalid");
  spanElement.textContent = errorMessage;
}
export function hideError(inputElement) {
  const spanElementSelector = `#error-${inputElement.id}`;
  const spanElement = document.querySelector(spanElementSelector);
  inputElement.classList.remove("popup__input_type_invalid");
  spanElement.textContent = "";
}
export function checkValidity(inputElement) {
  if (inputElement.validity.valid) {
    hideError(inputElement);
  } else {
    showError(inputElement, inputElement.validationMessage);
  }
}
