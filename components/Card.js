import { openedCard, openedCardName, openedCardPic, openPopup } from '../scripts/index.js';

export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }//определяем параметры карточки

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__title').textContent = this._name;

        return this._element;
    }//создаем карточку

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
        return cardElement;
    }//забираем шаблон из разметки

    _setEventListeners() {
        this._element.querySelector('.elements__heart-btn').addEventListener('click', function (evt) {
            evt.target.classList.toggle('elements__heart-btn_active');
        });
        this._element.querySelector('.elements__delete-btn').addEventListener('click', function (evt) {
            evt.target.closest('.elements__element').remove();
        });
        this._element.querySelector('.elements__image').addEventListener('click', () => this._openCardPicture());
    }//навешиваем основные обработчики на карточку - лайк, удаление, открытие картинки

    _openCardPicture() {
        openedCardName.textContent = this._name;
        openedCardPic.src = this._link;
        openedCardPic.alt = this._name;
        openPopup(openedCard);
    }//открытие картинки
}




