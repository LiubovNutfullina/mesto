export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handlePopupEscButton);
  }

// close

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handlePopupEscButton);
};

// close esc
  
export function handlePopupEscButton(evt) {
    if(evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_is-opened'));
    }
}
