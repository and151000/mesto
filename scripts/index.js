//импортируемые классы
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const form = document.querySelector(".popup_type_profile");
const profileName = document.querySelector(".profile__main-text");
const profession = document.querySelector(".profile__secondary-text");
const formName = document.querySelector("#name-profile");
const formProfession = document.querySelector("#job-profile");
const formContainer = document.querySelector(".popup__form");
const cardForm = document.querySelector(".popup_type_add-card");
const cardFormClose = document.querySelector(".popup__close-button_card");
const cardFormOpen = document.querySelector(".profile__add-button");
const cardFormContainer = document.querySelector(".popup__form_add-card");
const cardList = document.querySelector(".elements");
const cardTemplate = document.querySelector(".cards-template");
const inputCardName = document.querySelector(".popup__field_type_name-card");
const inputCardLink = document.querySelector(".popup__field_type_link");
export const openedCard = document.querySelector(".popup_type_photo");
export const openedCardClose = document.querySelector(".popup__close-button_photo");
export const openedCardName = openedCard.querySelector(".popup__photo-name");
export const openedCardPic = openedCard.querySelector(".popup__photo");


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

const data = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-button",
  inputErrorClass: "popup__field_state_invalid",
  inactiveButtonClass: "popup__submit-button_invalid",
  errorClass: "error_visible"
};

//формирование первоначальных картинок
initialCards.forEach((item) => {
  const card = new Card(item, '.cards-template');
  const cardElement = card.generateCard();
  cardList.append(cardElement);
});

openedCardClose.addEventListener('click', function (evt) {
  const targetPicture = evt.target.closest('.popup');
  closePopup(targetPicture);
});//закрытие картинки

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  const formValidator = new FormValidator(data);
  formValidator.enableValidation();// включаем валидацию;
  document.addEventListener('keyup', escapePopup);//слушаем нажатие esc на открытых попапах
  document.addEventListener('click', clickOutside);//слушаем клик на оверлэй
} //открытие попапов

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', escapePopup);
  document.removeEventListener('click', clickOutside);
} //закрытие попапов

function addNewCard(evt) {
  evt.preventDefault();
  const item = {
    name: inputCardName.value,
    link: inputCardLink.value
  }
  const newCard = new Card(item, '.cards-template');
  const newCardElement = newCard.generateCard();
  cardList.prepend(newCardElement);
  closePopup(cardForm);
  cardFormContainer.reset();
}//создание новой карточки

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profession.textContent = formProfession.value;
  closePopup(form);
}//сохранение имени и профессии из попапа профиля

function checkClass(popup) {
  return popup.classList.contains('popup_opened');
}//проверка, что попап открыт

function escapePopup(evt) {
  const popupActive = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(popupActive);
  }
}//закрытие попапа при нажатии esc

function clickOutside(evt) {
  if (checkClass(evt.target)) {
    closePopup(evt.target);
  };
};//закрытие попапа при клике на оверлей

cardFormContainer.addEventListener('submit', addNewCard);//триггер для сохранения новой карточки
cardFormOpen.addEventListener('click', () => openPopup(cardForm));//триггер открытия попапа для карточки
cardFormClose.addEventListener('click', () => closePopup(cardForm));//триггер закрытия попапа для карточки

editButton.addEventListener('click', () => {
  formContainer.reset();//сбрасываю из инпутов введенные, но не сохраненные данные пользователя
  formName.setAttribute('value', profileName.textContent);
  formProfession.setAttribute('value', profession.textContent);
  openPopup(form)
});//триггер открытия попапа для профиля

closeButton.addEventListener('click', () => closePopup(form));//триггер закрытия попапа для профиля
formContainer.addEventListener('submit', formSubmitHandler);//триггер сохранения имени и профессии из попапа профиля
