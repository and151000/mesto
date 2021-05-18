import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, closeButton, { handleFormSubmit }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
    this._closeButton = this._form.querySelector(closeButton);
    this.close = this.close.bind(this);
    this._formSubmitter = this._formSubmitter.bind(this);
    this._submitButton = this._popup.querySelector('.form__save-button');
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._formSubmitter);
  }

  _formSubmitter(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  open() {
    super.open();
    // this._form.removeEventListener('submit', this._formSubmitter);
  }

  close() {
    // this._closeButton.removeEventListener('click', this.close);//слушаем клик на кнопку закрытия
    // this._form.removeEventListener('submit', this._formSubmitter);
    this._submitButton.classList.add('popup__button_disabled');
    this._submitButton.setAttribute('disabled', true);
    this._form.reset();
    super.close();
  }
}//класс для форм