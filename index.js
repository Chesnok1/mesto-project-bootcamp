
 const open = document.querySelector('.popup');
 const editBotton = document.querySelector('.profile__edit-button');
 editBotton.addEventListener ('click' function(e)) {
  e.stopPropagation ();
  this classList.add ('.popup__opened')
 }
