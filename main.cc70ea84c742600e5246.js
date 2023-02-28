(()=>{"use strict";class e{constructor(e){this._popup=document.querySelector(e),this._popupCloseButton=this._popup.querySelector(".popup__close"),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("popup_is-opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("popup_is-opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}_closeOverlay(e){e.target===e.currentTarget&&this.close()}setEventListeners(){this._popupCloseButton.addEventListener("click",this.close.bind(this)),this._popup.addEventListener("mousedown",this._closeOverlay.bind(this))}}class t extends e{constructor(e,t){super(e),this._formValues={},this._popupForm=this._popup.querySelector(".popup__content_form"),this._callback=t,this._inputs=Array.from(this._popupForm.querySelectorAll(".input__text"))}getValue(e){return this._formValues[e]}setInputValues(e){this._inputs.forEach((t=>t.value=e[t.id]))}close(){super.close(),this._popupForm.reset()}setEventListeners(){super.setEventListeners(),this._popupForm.addEventListener("submit",(e=>{e.preventDefault(),this._getInputValues(),this._callback(this._formValues)}))}_getInputValues(){this._inputs.forEach((e=>this._formValues[e.id]=e.value))}}class n{constructor(e,t,n,s){this._name=e,this._link=t,this._templateSelector=n,this._handleCardClick=s}generateCard(){return this._newCard=this._getTemplate(),this._likeButton=this._newCard.querySelector(".element__like"),this._imageElement=this._newCard.querySelector(".element__image"),this._inputData(),this._setEventListeners(),this._newCard}_getTemplate(){return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(!0)}_deleteCard(){this._newCard.remove(),this._newCard=null}_likeCard(){this._likeButton.classList.toggle("element__like_active")}_setEventListeners(){this._newCard.querySelector(".element__trash").addEventListener("click",(()=>{this._deleteCard()})),this._likeButton.addEventListener("click",(()=>{this._likeCard()})),this._imageElement.addEventListener("click",(()=>{this._handleCardClick()}))}_inputData(){this._newCard.querySelector(".element__title").textContent=this._name,this._imageElement.src=this._link,this._imageElement.setAttribute("alt","Здесь показано место "+this._name)}}class s{constructor(e,t){this._validationConfig=e,this._formElement=t,this._inputList=Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector)),this._buttonElement=this._formElement.querySelector(this._validationConfig.submitButtonSelector),this._inputErrorElements=Array.from(this._formElement.querySelectorAll(this._validationConfig.inputErrorSelector))}enableValidation(){this._setEventListeners()}removeValidationErrors(){this._inputErrorElements.forEach((e=>{e.textContent=""})),this._inputList.forEach((e=>{e.classList.remove(this._validationConfig.inputTextInvalidClass)}))}enableSubmitButton(){this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass),this._buttonElement.disabled=!1}disableSubmitButton(){this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass),this._buttonElement.disabled=!0}_setEventListeners(){this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._isValid(e),this._toggleButtonState()}))}))}_toggleButtonState(){this._hasInvalidInput()?this.disableSubmitButton():this.enableSubmitButton()}_isValid(e){e.validity.valid?this._hideInputError(e):this._showInputError(e)}_showInputError(e){const t=this._formElement.querySelector(`.${e.id}-error`);e.classList.add(this._validationConfig.inputTextInvalidClass),t.textContent=e.validationMessage}_hideInputError(e){const t=this._formElement.querySelector(`.${e.id}-error`);e.classList.remove(this._validationConfig.inputTextInvalidClass),t.textContent=""}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}}document.querySelector(".elements");const i=document.querySelector(".popup_edit"),o=document.querySelector(".popup_add"),r=document.querySelector(".profile__edit-button"),l=document.querySelector(".profile__add-button"),a={inputSelector:".input__text",submitButtonSelector:".input__button-submit",inputTextInvalidClass:"input__text_invalid",inactiveButtonClass:"input__button-submit_invalid",inputErrorSelector:".input__text-error"},u=new class{constructor({nameSelector:e,jobSelector:t}){this._nameElement=document.querySelector(e),this._jobElement=document.querySelector(t)}getUserInfo(){return{name:this._nameElement.textContent,job:this._jobElement.textContent}}setUserInfo({name:e,job:t}){this._nameElement.textContent=e,this._jobElement.textContent=t}}({nameSelector:".profile__title",jobSelector:".profile__subtitle"}),p=new class{constructor({items:e,renderer:t},n){this._items=e,this._renderer=t,this._container=document.querySelector(n)}addItemInFront(e){this._container.append(e)}addItem(e){this._container.prepend(e)}clear(){this._container.innerHTML=""}renderItems(){this.clear(),this._items.forEach((e=>{this._renderer(e)}))}}({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:function(e){const t=v(e.name,e.link,"#element-template",(()=>{_.open(e.name,e.link)}));p.addItemInFront(t)}},".elements"),_=new class extends e{constructor(e){super(e),this._popupImage=this._popup.querySelector(".popup__image"),this._titleImage=this._popup.querySelector(".popup__title-image")}open(e,t){this._popupImage.setAttribute("src",t),this._popupImage.setAttribute("alt","Здесь показано место "+e),this._titleImage.textContent=e,super.open()}}(".popup_image"),d=new s(a,i),c=new t(".popup_edit",(e=>{u.setUserInfo({name:e.username,job:e.working}),c.close()})),h=new s(a,o),m=new t(".popup_add",(e=>{const t=v(e.title,e.link,"#element-template",(()=>{_.open(e.title,e.link)}));p.addItem(t),m.close()}));function v(e,t,s,i){return new n(e,t,s,i).generateCard()}p.renderItems(),d.enableValidation(),h.enableValidation(),r.addEventListener("click",(function(){const{name:e,job:t}=u.getUserInfo();c.setInputValues({username:e,working:t}),d.enableSubmitButton(),d.removeValidationErrors(),c.open()})),l.addEventListener("click",(function(){h.disableSubmitButton(),h.removeValidationErrors(),m.open()})),c.setEventListeners(),m.setEventListeners(),_.setEventListeners()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixTQWN4QyxXQUNFd0gsRUFBaUIvQyxzQkFDakIrQyxFQUFpQnRELHlCQUNqQnVELEVBQXFCNUgsTUFDdkIsSUFqQkF5SCxFQUF5QjdHLG9CQUN6QmdILEVBQXFCaEgsb0JBQ3JCd0csRUFBZXhHLG1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvY29tcG9uZW50cy9DYXJkLmpzIiwid2VicGFjazovL21lc3RvLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy91dGlscy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vbWVzdG8vLi9zcmMvY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyIsIndlYnBhY2s6Ly9tZXN0by8uL3NyYy9wYWdlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5fcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBvcHVwU2VsZWN0b3IpO1xyXG4gICAgICAgIHRoaXMuX3BvcHVwQ2xvc2VCdXR0b24gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2Nsb3NlJyk7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlRXNjQ2xvc2UgPSB0aGlzLl9oYW5kbGVFc2NDbG9zZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW4oKSB7XHJcbiAgICAgICAgdGhpcy5fcG9wdXAuY2xhc3NMaXN0LmFkZCgncG9wdXBfaXMtb3BlbmVkJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuX2hhbmRsZUVzY0Nsb3NlKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZSgpIHtcclxuICAgICAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwb3B1cF9pcy1vcGVuZWQnKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIF9oYW5kbGVFc2NDbG9zZShldnQpIHtcclxuICAgICAgICBpZihldnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIF9jbG9zZU92ZXJsYXkoZXZ0KSB7XHJcbiAgICAgICAgaWYgKGV2dC50YXJnZXQgPT09IGV2dC5jdXJyZW50VGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLl9wb3B1cENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbG9zZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl9jbG9zZU92ZXJsYXkuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn0gICIsImltcG9ydCBQb3B1cCBmcm9tICcuL1BvcHVwLmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcclxuICAgIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcbiAgICAgICAgdGhpcy5fZm9ybVZhbHVlcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX3BvcHVwRm9ybSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fY29udGVudF9mb3JtJyk7XHJcbiAgICAgICAgdGhpcy5fY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgICAgICB0aGlzLl9pbnB1dHMgPSBBcnJheS5mcm9tKHRoaXMuX3BvcHVwRm9ybS5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXRfX3RleHQnKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmFsdWUoaWQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybVZhbHVlc1tpZF07XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5wdXRWYWx1ZXMoZGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2lucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LnZhbHVlID0gZGF0YVtpbnB1dC5pZF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIHN1cGVyLmNsb3NlKCk7XHJcbiAgICAgICAgdGhpcy5fcG9wdXBGb3JtLnJlc2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgc3VwZXIuc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICAgICAgICB0aGlzLl9wb3B1cEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2dCkgPT4ge1xyXG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgdGhpcy5fZ2V0SW5wdXRWYWx1ZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2sodGhpcy5fZm9ybVZhbHVlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgICAgIHRoaXMuX2lucHV0cy5mb3JFYWNoKGlucHV0ID0+IHRoaXMuX2Zvcm1WYWx1ZXNbaW5wdXQuaWRdID0gaW5wdXQudmFsdWUpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgICBjb25zdHJ1Y3RvciAobmFtZSwgbGluaywgdGVtcGxhdGVTZWxlY3RvciwgaGFuZGxlQ2FyZENsaWNrKSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XHJcbiAgICAgICAgdGhpcy5fbGluayA9IGxpbms7XHJcbiAgICAgICAgdGhpcy5fdGVtcGxhdGVTZWxlY3RvciA9IHRlbXBsYXRlU2VsZWN0b3I7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlQ2FyZENsaWNrID0gaGFuZGxlQ2FyZENsaWNrO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBnZW5lcmF0ZUNhcmQoKSB7XHJcbiAgICAgICAgdGhpcy5fbmV3Q2FyZCA9IHRoaXMuX2dldFRlbXBsYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fbGlrZUJ1dHRvbiA9IHRoaXMuX25ld0NhcmQucXVlcnlTZWxlY3RvcignLmVsZW1lbnRfX2xpa2UnKTtcclxuICAgICAgICB0aGlzLl9pbWFnZUVsZW1lbnQgPSB0aGlzLl9uZXdDYXJkLnF1ZXJ5U2VsZWN0b3IoJy5lbGVtZW50X19pbWFnZScpO1xyXG4gICAgICAgIHRoaXMuX2lucHV0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLl9uZXdDYXJkO1xyXG4gICAgfVxyXG5cclxuICAgIF9nZXRUZW1wbGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBjYXJkRWxlbWVudCA9IGRvY3VtZW50XHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IodGhpcy5fdGVtcGxhdGVTZWxlY3RvcilcclxuICAgICAgICAuY29udGVudFxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudCcpXHJcbiAgICAgICAgLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGNhcmRFbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIF9kZWxldGVDYXJkKCkge1xyXG4gICAgICAgIHRoaXMuX25ld0NhcmQucmVtb3ZlKCk7XHJcbiAgICAgICAgdGhpcy5fbmV3Q2FyZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgX2xpa2VDYXJkKCkge1xyXG4gICAgICAgIHRoaXMuX2xpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSgnZWxlbWVudF9fbGlrZV9hY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICAgICAgY29uc3QgdHJhc2hFbGVtZW50ID0gdGhpcy5fbmV3Q2FyZC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudF9fdHJhc2gnKTtcclxuICAgICAgICB0cmFzaEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHRoaXMuX2RlbGV0ZUNhcmQoKSB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5fbGlrZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHsgdGhpcy5fbGlrZUNhcmQoKSB9KTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5faW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyB0aGlzLl9oYW5kbGVDYXJkQ2xpY2soKSB9KVxyXG4gICAgfVxyXG5cclxuICAgIF9pbnB1dERhdGEoKSB7XHJcbiAgICAgICAgY29uc3QgdGl0bGVFbGVtZW50ID0gdGhpcy5fbmV3Q2FyZC5xdWVyeVNlbGVjdG9yKCcuZWxlbWVudF9fdGl0bGUnKTtcclxuICAgICAgICB0aXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLl9uYW1lO1xyXG5cclxuICAgICAgICB0aGlzLl9pbWFnZUVsZW1lbnQuc3JjID0gdGhpcy5fbGluaztcclxuICAgICAgICB0aGlzLl9pbWFnZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhbHQnLCAn0JfQtNC10YHRjCDQv9C+0LrQsNC30LDQvdC+INC80LXRgdGC0L4gJyArIHRoaXMuX25hbWUpXHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbGlkYXRpb25Db25maWcsIGZvcm1FbGVtZW50KXtcclxuICAgICAgICB0aGlzLl92YWxpZGF0aW9uQ29uZmlnID0gdmFsaWRhdGlvbkNvbmZpZztcclxuICAgICAgICB0aGlzLl9mb3JtRWxlbWVudCA9IGZvcm1FbGVtZW50O1xyXG4gICAgICAgIHRoaXMuX2lucHV0TGlzdCA9IEFycmF5LmZyb20odGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl92YWxpZGF0aW9uQ29uZmlnLmlucHV0U2VsZWN0b3IpKTtcclxuICAgICAgICB0aGlzLl9idXR0b25FbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl92YWxpZGF0aW9uQ29uZmlnLnN1Ym1pdEJ1dHRvblNlbGVjdG9yKTtcclxuICAgICAgICB0aGlzLl9pbnB1dEVycm9yRWxlbWVudHMgPSBBcnJheS5mcm9tKHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fdmFsaWRhdGlvbkNvbmZpZy5pbnB1dEVycm9yU2VsZWN0b3IpKTtcclxuICAgIH1cclxuXHJcbiAgICBlbmFibGVWYWxpZGF0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuX3NldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVmFsaWRhdGlvbkVycm9ycygpIHtcclxuICAgICAgICB0aGlzLl9pbnB1dEVycm9yRWxlbWVudHMuZm9yRWFjaCgoZXJyb3JFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX3ZhbGlkYXRpb25Db25maWcuaW5wdXRUZXh0SW52YWxpZENsYXNzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgZW5hYmxlU3VibWl0QnV0dG9uKCkge1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl92YWxpZGF0aW9uQ29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNhYmxlU3VibWl0QnV0dG9uKCkge1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl92YWxpZGF0aW9uQ29uZmlnLmluYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvbkVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIFxyXG4gICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgICBcclxuICAgICAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXRFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzVmFsaWQoaW5wdXRFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIF90b2dnbGVCdXR0b25TdGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5faGFzSW52YWxpZElucHV0KCkpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXNhYmxlU3VibWl0QnV0dG9uKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbmFibGVTdWJtaXRCdXR0b24oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9pc1ZhbGlkKGlucHV0RWxlbWVudCkge1xyXG4gICAgICAgIGlmIChpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGlkZUlucHV0RXJyb3IoaW5wdXRFbGVtZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zaG93SW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBfc2hvd0lucHV0RXJyb3IoaW5wdXRFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihgLiR7aW5wdXRFbGVtZW50LmlkfS1lcnJvcmApO1xyXG4gICAgICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX3ZhbGlkYXRpb25Db25maWcuaW5wdXRUZXh0SW52YWxpZENsYXNzKTtcclxuICAgICAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBpbnB1dEVsZW1lbnQudmFsaWRhdGlvbk1lc3NhZ2U7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIF9oaWRlSW5wdXRFcnJvcihpbnB1dEVsZW1lbnQpIHtcclxuICAgICAgICBjb25zdCBlcnJvckVsZW1lbnQgPSB0aGlzLl9mb3JtRWxlbWVudC5xdWVyeVNlbGVjdG9yKGAuJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYCk7XHJcbiAgICAgICAgaW5wdXRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUodGhpcy5fdmFsaWRhdGlvbkNvbmZpZy5pbnB1dFRleHRJbnZhbGlkQ2xhc3MpO1xyXG4gICAgICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgX2hhc0ludmFsaWRJbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRMaXN0LnNvbWUoKGlucHV0RWxlbWVudCkgPT4gIWlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tICcuLi9jb21wb25lbnRzL1BvcHVwV2l0aEZvcm0uanMnO1xyXG5pbXBvcnQgUG9wdXBXaXRoSW1hZ2UgZnJvbSAnLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qcyc7XHJcbmltcG9ydCBVc2VySW5mbyBmcm9tICcuLi9jb21wb25lbnRzL1VzZXJJbmZvLmpzJztcclxuaW1wb3J0IENhcmQgZnJvbSAnLi4vY29tcG9uZW50cy9DYXJkLmpzJztcclxuaW1wb3J0IFNlY3Rpb24gZnJvbSAnLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzJztcclxuaW1wb3J0IEZvcm1WYWxpZGF0b3IgZnJvbSAnLi4vY29tcG9uZW50cy9Gb3JtVmFsaWRhdG9yLmpzJztcclxuXHJcbmNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVsZW1lbnRzJyk7XHJcbmNvbnN0IGVkaXRQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfZWRpdCcpO1xyXG5jb25zdCBhZGRQb3B1cEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfYWRkJyk7XHJcblxyXG5leHBvcnQgY29uc3QgYnV0dG9uT3BlbkVkaXRQcm9maWxlUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fZWRpdC1idXR0b24nKTtcclxuZXhwb3J0IGNvbnN0IGJ1dHRvbk9wZW5BZGRDYXJkUG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZmlsZV9fYWRkLWJ1dHRvbicpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRpYWxDYXJkcyA9IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ9CQ0YDRhdGL0LcnLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9waWN0dXJlcy5zMy55YW5kZXgubmV0L2Zyb250ZW5kLWRldmVsb3Blci9jYXJkcy1jb21wcmVzc2VkL2Fya2h5ei5qcGcnLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ9Cn0LXQu9GP0LHQuNC90YHQutCw0Y8g0L7QsdC70LDRgdGC0YwnLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9waWN0dXJlcy5zMy55YW5kZXgubmV0L2Zyb250ZW5kLWRldmVsb3Blci9jYXJkcy1jb21wcmVzc2VkL2NoZWx5YWJpbnNrLW9ibGFzdC5qcGcnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAn0JjQstCw0L3QvtCy0L4nLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9waWN0dXJlcy5zMy55YW5kZXgubmV0L2Zyb250ZW5kLWRldmVsb3Blci9jYXJkcy1jb21wcmVzc2VkL2l2YW5vdm8uanBnJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ9Ca0LDQvNGH0LDRgtC60LAnLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9waWN0dXJlcy5zMy55YW5kZXgubmV0L2Zyb250ZW5kLWRldmVsb3Blci9jYXJkcy1jb21wcmVzc2VkL2thbWNoYXRrYS5qcGcnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAn0KXQvtC70LzQvtCz0L7RgNGB0LrQuNC5INGA0LDQudC+0L0nLFxyXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9waWN0dXJlcy5zMy55YW5kZXgubmV0L2Zyb250ZW5kLWRldmVsb3Blci9jYXJkcy1jb21wcmVzc2VkL2tob2xtb2dvcnNreS1yYXlvbi5qcGcnXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAn0JHQsNC50LrQsNC7JyxcclxuICAgICAgbGluazogJ2h0dHBzOi8vcGljdHVyZXMuczMueWFuZGV4Lm5ldC9mcm9udGVuZC1kZXZlbG9wZXIvY2FyZHMtY29tcHJlc3NlZC9iYWlrYWwuanBnJ1xyXG4gICAgfVxyXG4gIF07XHJcbiAgXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0aW9uQ29uZmlnID0ge1xyXG4gICAgaW5wdXRTZWxlY3RvcjogJy5pbnB1dF9fdGV4dCcsXHJcbiAgICBzdWJtaXRCdXR0b25TZWxlY3RvcjogJy5pbnB1dF9fYnV0dG9uLXN1Ym1pdCcsXHJcbiAgICBpbnB1dFRleHRJbnZhbGlkQ2xhc3M6ICdpbnB1dF9fdGV4dF9pbnZhbGlkJyxcclxuICAgaW5hY3RpdmVCdXR0b25DbGFzczogJ2lucHV0X19idXR0b24tc3VibWl0X2ludmFsaWQnLFxyXG4gICBpbnB1dEVycm9yU2VsZWN0b3I6ICcuaW5wdXRfX3RleHQtZXJyb3InLFxyXG4gfTtcclxuIFxyXG5leHBvcnQgY29uc3QgdXNlckluZm8gPSBuZXcgVXNlckluZm8oe1xyXG4gICBuYW1lU2VsZWN0b3I6ICcucHJvZmlsZV9fdGl0bGUnLFxyXG4gICBqb2JTZWxlY3RvcjogJy5wcm9maWxlX19zdWJ0aXRsZScsXHJcbiB9KTtcclxuIFxyXG5leHBvcnQgY29uc3Qgc2VjdGlvbiA9IG5ldyBTZWN0aW9uKHsgaXRlbXM6IGluaXRpYWxDYXJkcywgcmVuZGVyZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcclxuICAgY29uc3QgY2FyZCA9IGNyZWF0ZUNhcmQoaXRlbS5uYW1lLCBpdGVtLmxpbmssICcjZWxlbWVudC10ZW1wbGF0ZScsICgpID0+IHtcclxuICAgICBwb3B1cFdpdGhJbWFnZS5vcGVuKGl0ZW0ubmFtZSwgaXRlbS5saW5rKVxyXG4gICB9KTtcclxuXHJcbiAgIHNlY3Rpb24uYWRkSXRlbUluRnJvbnQoY2FyZCk7XHJcbn19LCAnLmVsZW1lbnRzJyk7XHJcblxyXG5leHBvcnQgY29uc3QgcG9wdXBXaXRoSW1hZ2UgPSBuZXcgUG9wdXBXaXRoSW1hZ2UoJy5wb3B1cF9pbWFnZScpO1xyXG4gXHJcbmV4cG9ydCBjb25zdCBlZGl0UHJvZmlsZVZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHZhbGlkYXRpb25Db25maWcsIGVkaXRQb3B1cEVsZW1lbnQpO1xyXG5leHBvcnQgY29uc3QgcG9wdXBXaXRoRm9ybUVkaXRQcm9maWxlID0gbmV3IFBvcHVwV2l0aEZvcm0oJy5wb3B1cF9lZGl0JywgKHZhbHVlcykgPT4ge1xyXG4gIHVzZXJJbmZvLnNldFVzZXJJbmZvKHtcclxuICAgIG5hbWU6IHZhbHVlc1sndXNlcm5hbWUnXSxcclxuICAgIGpvYjogdmFsdWVzWyd3b3JraW5nJ10sXHJcbiAgfSk7XHJcbiBcclxuICAgcG9wdXBXaXRoRm9ybUVkaXRQcm9maWxlLmNsb3NlKCk7XHJcbiB9KTtcclxuIFxyXG5leHBvcnQgY29uc3QgYWRkQ2FyZFZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKHZhbGlkYXRpb25Db25maWcsIGFkZFBvcHVwRWxlbWVudCk7XHJcbmV4cG9ydCBjb25zdCBwb3B1cFdpdGhGb3JtQWRkQ2FyZCA9IG5ldyBQb3B1cFdpdGhGb3JtKCcucG9wdXBfYWRkJywgKHZhbHVlcykgPT4ge1xyXG4gIGNvbnN0IGNhcmQgPSBjcmVhdGVDYXJkKFxyXG4gICAgdmFsdWVzWyd0aXRsZSddLFxyXG4gICAgdmFsdWVzWydsaW5rJ10sXHJcbiAgICAnI2VsZW1lbnQtdGVtcGxhdGUnLFxyXG4gICAgICgpID0+IHtcclxuICAgICAgcG9wdXBXaXRoSW1hZ2Uub3BlbihcclxuICAgICAgICB2YWx1ZXNbJ3RpdGxlJ10sXHJcbiAgICAgICAgdmFsdWVzWydsaW5rJ10sXHJcbiAgICAgICApO1xyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHNlY3Rpb24uYWRkSXRlbShjYXJkKTtcclxuXHJcbiAgcG9wdXBXaXRoRm9ybUFkZENhcmQuY2xvc2UoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDYXJkKG5hbWUsIGxpbmssIHRlbXBsYXRlU2VsZWN0b3IsIGhhbmRsZUNhcmRDbGljaykge1xyXG4gIGNvbnN0IGNhcmQgPSBuZXcgQ2FyZChuYW1lLCBsaW5rLCB0ZW1wbGF0ZVNlbGVjdG9yLCBoYW5kbGVDYXJkQ2xpY2spO1xyXG4gIGNvbnN0IGNhcmRFbGVtZW50ID0gY2FyZC5nZW5lcmF0ZUNhcmQoKTtcclxuICByZXR1cm4gY2FyZEVsZW1lbnQ7XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih7IG5hbWVTZWxlY3Rvciwgam9iU2VsZWN0b3J9KSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5hbWVTZWxlY3Rvcik7XHJcbiAgICAgICAgdGhpcy5fam9iRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioam9iU2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFVzZXJJbmZvKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuX25hbWVFbGVtZW50LnRleHRDb250ZW50LFxyXG4gICAgICAgICAgICBqb2I6IHRoaXMuX2pvYkVsZW1lbnQudGV4dENvbnRlbnQsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFVzZXJJbmZvKHtuYW1lLCBqb2J9KSB7XHJcbiAgICAgICAgdGhpcy5fbmFtZUVsZW1lbnQudGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuX2pvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBqb2I7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHsgaXRlbXMsIHJlbmRlcmVyIH0sIGNvbnRhaW5lclNlbGVjdG9yKSB7XHJcbiAgICAgICAgdGhpcy5faXRlbXMgPSBpdGVtcztcclxuICAgICAgICB0aGlzLl9yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW1JbkZyb250KGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kKGVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZEl0ZW0oZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5wcmVwZW5kKGVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJJdGVtcygpIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfTtcclxufSIsImltcG9ydCBQb3B1cCBmcm9tICcuL1BvcHVwLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvcHVwV2l0aEltYWdlIGV4dGVuZHMgUG9wdXAge1xyXG4gICAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcil7XHJcbiAgICAgICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIHRoaXMuX3BvcHVwSW1hZ2UgPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKCcucG9wdXBfX2ltYWdlJyk7XHJcbiAgICAgICAgdGhpcy5fdGl0bGVJbWFnZSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cF9fdGl0bGUtaW1hZ2UnKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuKHRpdGxlLCBzcmMpIHtcclxuICAgICAgICB0aGlzLl9wb3B1cEltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjKTtcclxuICAgICAgICB0aGlzLl9wb3B1cEltYWdlLnNldEF0dHJpYnV0ZSgnYWx0JywgJ9CX0LTQtdGB0Ywg0L/QvtC60LDQt9Cw0L3QviDQvNC10YHRgtC+ICcgKyB0aXRsZSk7XHJcbiAgICAgICAgdGhpcy5fdGl0bGVJbWFnZS50ZXh0Q29udGVudCA9IHRpdGxlO1xyXG5cclxuICAgICAgICBzdXBlci5vcGVuKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgJy4vaW5kZXguY3NzJztcclxuaW1wb3J0IHsgXHJcbiAgc2VjdGlvbixcclxuICBlZGl0UHJvZmlsZVZhbGlkYXRvcixcclxuICBhZGRDYXJkVmFsaWRhdG9yLFxyXG4gIGJ1dHRvbk9wZW5FZGl0UHJvZmlsZVBvcHVwLFxyXG4gIGJ1dHRvbk9wZW5BZGRDYXJkUG9wdXAsXHJcbiAgcG9wdXBXaXRoRm9ybUVkaXRQcm9maWxlLFxyXG4gIHBvcHVwV2l0aEZvcm1BZGRDYXJkLFxyXG4gIHBvcHVwV2l0aEltYWdlLFxyXG4gIHVzZXJJbmZvLFxyXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XHJcblxyXG5cclxuc2VjdGlvbi5yZW5kZXJJdGVtcygpO1xyXG5cclxuZWRpdFByb2ZpbGVWYWxpZGF0b3IuZW5hYmxlVmFsaWRhdGlvbigpO1xyXG5hZGRDYXJkVmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuYnV0dG9uT3BlbkVkaXRQcm9maWxlUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlZGl0UG9wdXBPcGVuSGFuZGxlcik7XHJcbmJ1dHRvbk9wZW5BZGRDYXJkUG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRQb3B1cE9wZW5IYW5kbGVyKTtcclxucG9wdXBXaXRoRm9ybUVkaXRQcm9maWxlLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbnBvcHVwV2l0aEZvcm1BZGRDYXJkLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbnBvcHVwV2l0aEltYWdlLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5mdW5jdGlvbiBlZGl0UG9wdXBPcGVuSGFuZGxlcigpIHsgIFxyXG4gIGNvbnN0IHsgbmFtZSwgam9iIH0gPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xyXG4gIHBvcHVwV2l0aEZvcm1FZGl0UHJvZmlsZS5zZXRJbnB1dFZhbHVlcyh7IHVzZXJuYW1lOiBuYW1lLCB3b3JraW5nOiBqb2IgfSk7XHJcblxyXG4gIGVkaXRQcm9maWxlVmFsaWRhdG9yLmVuYWJsZVN1Ym1pdEJ1dHRvbigpO1xyXG4gIGVkaXRQcm9maWxlVmFsaWRhdG9yLnJlbW92ZVZhbGlkYXRpb25FcnJvcnMoKTtcclxuICBwb3B1cFdpdGhGb3JtRWRpdFByb2ZpbGUub3BlbigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRQb3B1cE9wZW5IYW5kbGVyKCkge1xyXG4gIGFkZENhcmRWYWxpZGF0b3IuZGlzYWJsZVN1Ym1pdEJ1dHRvbigpO1xyXG4gIGFkZENhcmRWYWxpZGF0b3IucmVtb3ZlVmFsaWRhdGlvbkVycm9ycygpO1xyXG4gIHBvcHVwV2l0aEZvcm1BZGRDYXJkLm9wZW4oKTtcclxufSJdLCJuYW1lcyI6WyJQb3B1cCIsImNvbnN0cnVjdG9yIiwicG9wdXBTZWxlY3RvciIsInRoaXMiLCJfcG9wdXAiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJfcG9wdXBDbG9zZUJ1dHRvbiIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJvcGVuIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsb3NlIiwicmVtb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsIl9jbG9zZU92ZXJsYXkiLCJ0YXJnZXQiLCJjdXJyZW50VGFyZ2V0Iiwic2V0RXZlbnRMaXN0ZW5lcnMiLCJQb3B1cFdpdGhGb3JtIiwiY2FsbGJhY2siLCJzdXBlciIsIl9mb3JtVmFsdWVzIiwiX3BvcHVwRm9ybSIsIl9jYWxsYmFjayIsIl9pbnB1dHMiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiZ2V0VmFsdWUiLCJpZCIsInNldElucHV0VmFsdWVzIiwiZGF0YSIsImZvckVhY2giLCJpbnB1dCIsInZhbHVlIiwicmVzZXQiLCJwcmV2ZW50RGVmYXVsdCIsIl9nZXRJbnB1dFZhbHVlcyIsIkNhcmQiLCJuYW1lIiwibGluayIsInRlbXBsYXRlU2VsZWN0b3IiLCJoYW5kbGVDYXJkQ2xpY2siLCJfbmFtZSIsIl9saW5rIiwiX3RlbXBsYXRlU2VsZWN0b3IiLCJfaGFuZGxlQ2FyZENsaWNrIiwiZ2VuZXJhdGVDYXJkIiwiX25ld0NhcmQiLCJfZ2V0VGVtcGxhdGUiLCJfbGlrZUJ1dHRvbiIsIl9pbWFnZUVsZW1lbnQiLCJfaW5wdXREYXRhIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiY29udGVudCIsImNsb25lTm9kZSIsIl9kZWxldGVDYXJkIiwiX2xpa2VDYXJkIiwidG9nZ2xlIiwidGV4dENvbnRlbnQiLCJzcmMiLCJzZXRBdHRyaWJ1dGUiLCJGb3JtVmFsaWRhdG9yIiwidmFsaWRhdGlvbkNvbmZpZyIsImZvcm1FbGVtZW50IiwiX3ZhbGlkYXRpb25Db25maWciLCJfZm9ybUVsZW1lbnQiLCJfaW5wdXRMaXN0IiwiaW5wdXRTZWxlY3RvciIsIl9idXR0b25FbGVtZW50Iiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5wdXRFcnJvckVsZW1lbnRzIiwiaW5wdXRFcnJvclNlbGVjdG9yIiwiZW5hYmxlVmFsaWRhdGlvbiIsInJlbW92ZVZhbGlkYXRpb25FcnJvcnMiLCJlcnJvckVsZW1lbnQiLCJpbnB1dEVsZW1lbnQiLCJpbnB1dFRleHRJbnZhbGlkQ2xhc3MiLCJlbmFibGVTdWJtaXRCdXR0b24iLCJpbmFjdGl2ZUJ1dHRvbkNsYXNzIiwiZGlzYWJsZWQiLCJkaXNhYmxlU3VibWl0QnV0dG9uIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiX2lzVmFsaWQiLCJfaGFzSW52YWxpZElucHV0IiwidmFsaWRpdHkiLCJ2YWxpZCIsIl9oaWRlSW5wdXRFcnJvciIsIl9zaG93SW5wdXRFcnJvciIsInZhbGlkYXRpb25NZXNzYWdlIiwic29tZSIsImVkaXRQb3B1cEVsZW1lbnQiLCJhZGRQb3B1cEVsZW1lbnQiLCJidXR0b25PcGVuRWRpdFByb2ZpbGVQb3B1cCIsImJ1dHRvbk9wZW5BZGRDYXJkUG9wdXAiLCJ1c2VySW5mbyIsIm5hbWVTZWxlY3RvciIsImpvYlNlbGVjdG9yIiwiX25hbWVFbGVtZW50IiwiX2pvYkVsZW1lbnQiLCJnZXRVc2VySW5mbyIsImpvYiIsInNldFVzZXJJbmZvIiwic2VjdGlvbiIsIml0ZW1zIiwicmVuZGVyZXIiLCJjb250YWluZXJTZWxlY3RvciIsIl9pdGVtcyIsIl9yZW5kZXJlciIsIl9jb250YWluZXIiLCJhZGRJdGVtSW5Gcm9udCIsImVsZW1lbnQiLCJhcHBlbmQiLCJhZGRJdGVtIiwicHJlcGVuZCIsImNsZWFyIiwiaW5uZXJIVE1MIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiY2FyZCIsImNyZWF0ZUNhcmQiLCJwb3B1cFdpdGhJbWFnZSIsIl9wb3B1cEltYWdlIiwiX3RpdGxlSW1hZ2UiLCJ0aXRsZSIsImVkaXRQcm9maWxlVmFsaWRhdG9yIiwicG9wdXBXaXRoRm9ybUVkaXRQcm9maWxlIiwidmFsdWVzIiwiYWRkQ2FyZFZhbGlkYXRvciIsInBvcHVwV2l0aEZvcm1BZGRDYXJkIiwidXNlcm5hbWUiLCJ3b3JraW5nIl0sInNvdXJjZVJvb3QiOiIifQ==