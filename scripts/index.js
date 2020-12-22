const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const profilePopup = document.querySelector(".popup_type_profile");
const profileName = document.querySelector(".profile__main-text");
const profession = document.querySelector(".profile__secondary-text");
const formName = document.querySelector("#name-profile");
const formProfession = document.querySelector("#job-profile");
const formContainer = document.querySelector(".popup__form");
const cardPopup = document.querySelector(".popup_type_add-card");
const cardFormClose = document.querySelector(".popup__close-button_card");
const cardFormOpen = document.querySelector(".profile__add-button");
const cardFormContainer = document.querySelector(".popup__form_add-card");
const cardList = document.querySelector(".elements");
const cardTemplate = document.querySelector(".cards-template");
const inputCardName = document.querySelector(".popup__field_type_name-card");
const inputCardLink = document.querySelector(".popup__field_type_link");
const openedCard = document.querySelector(".popup_type_photo");
const openedCardClose = document.querySelector(".popup__close-button_photo");
const openedCardName = openedCard.querySelector(".popup__photo-name");
const openedCardPic = openedCard.querySelector(".popup__photo");

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

//формирование первоначальных картинок
function createFirstCards() {
  const listCards = initialCards.map(composeCard);
  cardList.append(...listCards);
}
createFirstCards();

//формирование карточки, работа лайка, удаление карточки, открытие вложенной картинки
function composeCard({ name, link }) {
  const newCard = cardTemplate.content.cloneNode(true);
  const cardName = newCard.querySelector(".elements__title");
  const cardLink = newCard.querySelector(".elements__image");
  cardName.textContent = name;
  cardLink.src = link;
  cardLink.alt = name;
  newCard.querySelector(".elements__heart-btn").addEventListener("click", function (evt) {
    evt.target.classList.toggle("elements__heart-btn_active");
  });
  newCard.querySelector(".elements__delete-btn").addEventListener("click", function (evt) {
    evt.target.closest(".elements__element").remove();
  });
  cardLink.addEventListener("click", () => openCardPicture({ name, link }));
  return newCard;
}

//открытие фото
function openCardPicture({ name, link }) {
  openedCardName.textContent = name;
  openedCardPic.src = link;
  openedCardPic.alt = name;
  openPopup(openedCard);
}

//закрытие фото
openedCardClose.addEventListener("click", function (evt) {
  closePopup(openedCard);
});

//открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  //вызов валидации  
  enableValidation(validationConfig);
  //слушатель нажатия esc на открытых попапах
  document.addEventListener("keyup", escapePopup);
  //слушатель клика на оверлэй
  document.addEventListener("click", clickOutside);
}

//закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", escapePopup);
  document.removeEventListener("click", clickOutside);
}

//добавление новой карточки
function addNewCard(evt) {
  evt.preventDefault();
  const inputName = inputCardName.value;
  const inputLink = inputCardLink.value;
  const newCard = composeCard({ name: inputName, link: inputLink });
  cardList.prepend(newCard);
  closePopup(cardPopup);
  cardFormContainer.reset();
}

//сохранение имени и профессии попапа профиля
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = formName.value;
  profession.textContent = formProfession.value;
  closePopup(profilePopup);
}

//проверка, что попап открыт
function checkClass(popup) {
  return popup.classList.contains("popup_opened");
}

//закрытие попапа по esc
function escapePopup(evt) {
  const popupActive = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popupActive);
  }
}

//закрытие попапа по оверлею
function clickOutside(evt) {
  if (checkClass(evt.target)) {
    closePopup(evt.target);
  }
}

cardFormContainer.addEventListener("submit", addNewCard); //слушатель для сохранения новой карточки
cardFormOpen.addEventListener("click", () => openPopup(cardPopup)); //слушатель открытия попапа для карточки
cardFormClose.addEventListener("click", () => closePopup(cardPopup)); //слушатель закрытия попапа для карточки

editButton.addEventListener("click", () => {
  formContainer.reset(); //сбрасываю из инпутов введенные, но не сохраненные данные пользователя
  formName.setAttribute("value", profileName.textContent);
  formProfession.setAttribute("value", profession.textContent);
  openPopup(profilePopup);
}); //слушатель открытия попапа профиля

closeButton.addEventListener("click", () => closePopup(profilePopup)); //слушатель закрытия попапа для профиля
formContainer.addEventListener("submit", formSubmitHandler); //слушатель сохранения имени и профессии из попапа профиля
