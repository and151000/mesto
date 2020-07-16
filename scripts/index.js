

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];





const profileName = document.querySelector('.profile__main-text');
const profileJob = document.querySelector('.profile__secondary-text');
const popupAddButton = document.querySelector('.profile__add-button');
const elementDeleteCard = document.querySelector('.elements__delete-btn');
const photoImage = document.querySelector('.popup__photo');
const photoName = document.querySelector('.popup__photo-name');
const popupPhotoCloseButton = document.querySelector('.popup__close-button_photo');
const elementImage = document.querySelector('.elements__image');
const elementTitle = document.querySelector('.elements__title');

const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupPhoto = document.querySelector('.popup_type_photo');
const cards = document.querySelector('.elements');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupCloseAddCardButton = document.querySelector('.popup__close-button_card');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form');
const popupFormAddCard = document.querySelector('.popup__form_add-card');

const elementLikeButton = document.querySelector('.elements__heart-btn');

const nameInput = document.querySelector('.popup__field_type_name');
const jobInput = document.querySelector('.popup__field_type_description');
const newElementNameInput = document.querySelector('.popup__field_type_name-card');
const newElementLinkInput = document.querySelector('.popup__field_type_link');

const cardsTemplate = document.querySelector('.cards-template').content;

// popup switch
const popupToggle = function(popup) {
  popup.classList.toggle('popup_opened');
}

// popupProfile handlers
  function profileToggleHandler () {
    popupToggle(popupProfile);

    if (popupProfile.classList.contains('popup_opened')) {
     nameInput.value = profileName.textContent;
     jobInput.value = profileJob.textContent;
    }
  };

  const profileFormSubmitHandler = function(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    popupToggle(popupProfile); 
  }

// popupProfile Listeners
  popupEditButton.addEventListener('click', profileToggleHandler);
  popupCloseButton.addEventListener('click', profileToggleHandler);
  popupForm.addEventListener('submit', profileFormSubmitHandler);



  // popupAddCard open/close
  popupAddButton.addEventListener('click', () => popupToggle(popupAddCard));
  popupCloseAddCardButton.addEventListener('click', () => popupToggle(popupAddCard));



// Likes
const like = function(evt) {
  evt.currentTarget.classList.toggle('elements__heart-btn_active');
}




// card delete
const cardDelete = function(evt) {
  evt.target.closest('.elements__element').remove()
}



// popupPhoto
const openPopupPhoto = function(evt) {
  photoImage.src = evt.currentTarget.src;
  photoName.textContent = evt.currentTarget.alt;
  photoImage.alt = evt.currentTarget.alt;

  popupToggle(popupPhoto)
}

// popupPhoto close
popupPhotoCloseButton.addEventListener('click', () => popupToggle(popupPhoto));


// create card
function createCard (card) {
  
  const cardsElement = cardsTemplate.cloneNode(true);
  const cardsElementImage = cardsElement.querySelector('.elements__image');
  const cardsElementTitle = cardsElement.querySelector('.elements__title');
  const cardsElementLikeButton = cardsElement.querySelector('.elements__heart-btn');
  const cardsElementDeleteButton = cardsElement.querySelector('.elements__delete-btn');
  
  cardsElementImage.src = card.link; 
  cardsElementImage.alt = card.name; 
  cardsElementTitle.textContent = card.name; 
  cardsElementLikeButton.addEventListener('click', like); 
  cardsElementDeleteButton.addEventListener('click', cardDelete); 
  cardsElementImage.addEventListener('click', openPopupPhoto);
  return cardsElement;
};


//перебор массива
function renderCards(newCards) {
  newCards.forEach(card => {
    cards.prepend(createCard(card))
  });
}
renderCards(initialCards);


// add new card
const elementSubmitHandler = function(evt) {
  evt.preventDefault();

  const elementFormName = {
    name: newElementNameInput.value,
    link: newElementLinkInput.value
  }
  cards.prepend(createCard(elementFormName));
  popupToggle(popupAddCard);

  //обнулить поля
  newElementNameInput.value = '';
  newElementLinkInput.value = '';
} 
// слушатель на submit card
popupFormAddCard.addEventListener('submit', elementSubmitHandler);
