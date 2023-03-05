import './index.css';
import Section from '../components/Section.js';
import { 
  api,
  editProfileValidator,
  addCardValidator,
  avatarCardValidator,
  buttonOpenEditProfilePopup,
  buttonOpenAddCardPopup,
  buttonOpenAvatarPopup,
  popupWithFormEditProfile,
  popupWithImage,
  userInfo,
  createCard,
  popupWithFormAvatarCard,
  popupWithConfirmation,
} from '../utils/constants';
import PopupWithForm from '../components/PopupWithForm.js';

api.getUserInfo()
  .then(userInfoBack => {
    userInfo.setUserInfo({
      name: userInfoBack.name,
      job: userInfoBack.about,
    });
    userInfo.setAvatar(userInfoBack.avatar);

  api.getInitialCards()
  .then(res => {
    const section = new Section( { items: res, renderer: function(item) {
      let likes = item.likes;
      const card = createCard(
        item,
        '#element-template', 
        userInfoBack._id === item.owner._id,
        item.likes.some(like => like._id === userInfoBack._id),
        {
          handleCardClick: () => {
            popupWithImage.open(item.name, item.link)
          },
          handleTrashClick: (callback) => {
            popupWithConfirmation.open(() => {
              return api.deleteCard(item._id)
                .then(() => {
                  callback();
                })
                .catch((err) => {
                  console.log(err);
                });
              });
          },
          handleLikeClick: (callback) => {
            return likes.some(like => like._id === userInfoBack._id) 
              ? api.deleteLike(item._id).then((updatedItem) => { 
                callback(updatedItem);
                likes = updatedItem.likes;
              }).catch((err) => {
                console.log(err);
              })
              : api.addLike(item._id).then((updatedItem) => { 
                callback(updatedItem);
                likes = updatedItem.likes;
              }).catch((err) => {
                console.log(err);
              });
          },
        },
      );

      section.addItemInFront(card);
    }}, '.elements');

  section.renderItems();

  const popupWithFormAddCard = new PopupWithForm('.popup_add', (values) => {
    return api.addNewCard(values['title'], values['url'])
      .then(res => {
        const card = createCard(
          res,
          '#element-template',
          true,
          false,
          {
            handleCardClick: () => {
              popupWithImage.open(
                res.name,
                res.link,
              );
            },
            handleTrashClick: (callback) => {
              popupWithConfirmation.open(() => {
                return api.deleteCard(res._id).then(()=> {callback();}).catch(err => console.log(err));
              });
            },
            handleLikeClick: (callback) => {
              return res.likes.some(like => like.owner._id === userInfo._id) 
                ? api.deleteLike(res._id).then((response) => { callback(response); }).catch(err => console.log(err))
                : api.addLike(res._id).then((response) => { callback(response); }).catch(err => console.log(err));
            },
          },
        );
        section.addItem(card);

        popupWithFormAddCard.close();
      }).catch((err) => {
        console.log(err);
      });
  });

    editProfileValidator.enableValidation();
    addCardValidator.enableValidation();
    avatarCardValidator.enableValidation();

    buttonOpenEditProfilePopup.addEventListener('click', editPopupOpenHandler);
    buttonOpenAddCardPopup.addEventListener('click', () => {
      addCardValidator.disableSubmitButton();
      addCardValidator.removeValidationErrors();
      popupWithFormAddCard.open();
    });
    buttonOpenAvatarPopup.addEventListener('click', () => {
      avatarCardValidator.disableSubmitButton();
      avatarCardValidator.removeValidationErrors();
      popupWithFormAvatarCard.open();
    });
    popupWithFormAvatarCard.setEventListeners();
    popupWithFormEditProfile.setEventListeners();
    popupWithFormAddCard.setEventListeners();
    popupWithImage.setEventListeners();
    popupWithConfirmation.setEventListeners();
  })
  .catch((err) => {
    console.log(err);
  });
})
.catch((err) => {
  console.log(err);
});

function editPopupOpenHandler() {  
  const { name, job } = userInfo.getUserInfo();
  popupWithFormEditProfile.setInputValues({ username: name, working: job });

  editProfileValidator.enableSubmitButton();
  editProfileValidator.removeValidationErrors();
  popupWithFormEditProfile.open();
}