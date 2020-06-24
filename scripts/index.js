const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');
const popupForm = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__main-text');
const profileJob = document.querySelector('.profile__secondary-text');

let nameInput = document.querySelector('.popup__field_type_name');
let jobInput = document.querySelector('.popup__field_type_description');


const popupToggle = function () {
  popup.classList.toggle('popup_opened')
  
  if (popup.classList.contains('popup_opened')) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}


  popupOpenButton.addEventListener('click', popupToggle);
  popupCloseButton.addEventListener('click', popupToggle);

function formSubmitHandler(event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupToggle(); 
}
    
    popupForm.addEventListener('submit', formSubmitHandler);