const buttonSave = document.querySelector(".popup__button_type_save");
const buttonEdit = document.querySelector(".popup__button_type_edit");

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
export function toggleButton() {
  console.log(buttonEdit);
  console.log(buttonSave);
  console.log("formEdit: ", document.forms.formEdit.checkValidity());
  console.log("formNew: ", document.forms.formNew.checkValidity());

  if (document.forms.formEdit.checkValidity()) {
    buttonEdit.disabled = false;
    buttonEdit.classList.remove("popup__button_disabled");
  } else {
    buttonEdit.disabled = true;
    buttonEdit.classList.add("popup__button_disabled");
  }
  if (document.forms.formNew.checkValidity()) {
    buttonSave.disabled = false;
    buttonSave.classList.remove("popup__button_disabled");
  } else {
    buttonSave.disabled = true;
    buttonSave.classList.add("popup__button_disabled");
  }
}
