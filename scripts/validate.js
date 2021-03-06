//показать ошибку валидации
function showError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = input.validationMessage;
  input.classList.add(config.inputInvalidClass);
  error.classList.add(config.errorClass);
}

//скрыть ошибку валидации
function hideError(form, input, config) {
  const error = form.querySelector(`#${input.id}-error`);
  error.textContent = "";
  input.classList.remove(config.inputInvalidClass);
  error.classList.remove(config.errorClass);
}

//проверить форму на валидность
function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showError(form, input, config);
  } else {
    hideError(form, input, config);
  }
}

//включить/выключить кнопку сохранения
function setButtonState(button, isActive, config) {
  if (isActive) {
    button.classList.remove(config.buttonInvalidClass);
    button.disabled = false;
  } else {
    button.classList.add(config.buttonInvalidClass);
    button.disabled = true;
  }
}

//обработчики событий на инпуты
function setEventListeners(form, config) {
  const inputsList = form.querySelectorAll(config.inputSelector);
  const submitButton = form.querySelector(config.submitButtonSelector);

  inputsList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, config);
      setButtonState(submitButton, form.checkValidity(), config);
    });
  });
}

//включить валидацию, обработчики событий для форм
function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
  });
}

//исходная конфигурация для функции включения валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-button",
  inputInvalidClass: "popup__field_state_invalid",
  buttonInvalidClass: "popup__submit-button_invalid",
  errorClass: "error_visible"

};


//убирать ошибку, если закрыли форму, не исправив ее
function resetErrorMessage(form, config) {
  const inputList = form.querySelectorAll(config.inputSelector);
  inputList.forEach((input) => {
    hideError(form, input, config)
  });
}

//Сброс валидации кнопки после закрытия формы с ошибкой
function resetSubmitButton(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(form => {
    const submitButton = form.querySelector(config.submitButtonSelector);
    setButtonState(submitButton, form.checkValidity(), config);
  });
}

//вызов функции включения валидации
enableValidation(validationConfig);

