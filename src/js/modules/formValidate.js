//"use strict"
import { popUp } from './popup.js';
/*-------------------FORM-VALIDATE-JS----------------------------*/
export function validate(form) {

   if (form == document.forms.emailSubmit) {
      let fail = validateEmail(form.email.value)
      if (fail == false) {
         //   formSend(form);
         popUp();
         return false
      } else { return false }
   }
}



/*async function formSend(form) {
   let formData = new FormData(form)
   let response = await fetch('/fpg/Skip/sendmail.php', {
      method: 'POST',
      body: formData
   });
   if (response.ok) {
      document.querySelector('.popup').classList.add("open");
      document.querySelector('.confirm').classList.add("send");
      document.querySelector('.popup__title').classList.add("send");
      document.querySelector('.popup__text').classList.add("send");
      form.reset();
   } else {
      alert("Ошибка HTTP: " + response.status);
   }
}*/


function validateEmail(field) {
   let space = field.replace(/\s+/g, '');
   if (space == "") {
      document.querySelector('.error-input').classList.add("active");// text-field-name -> visibility: hidden; / .error -> visibility: visible;
      document.querySelector('.error-input.active').innerHTML = "Это поле не должно быть пусты!";
      return
   }

   else if (!((space.indexOf(".") > 0) && (space.indexOf("@") > 0)) || /[^a-zA-Z0-9.@_-]/.test(space) || space.length < 6) {
      document.querySelector('.error-input').classList.add("active");
      document.querySelector('.error-input.active').innerHTML = "Не корректный Email адрес!";
   }
   else {
      document.querySelector('.error-input').classList.remove("active");
      return false;
   }
}


/*-------------------FORM-VALIDATE-JS----------------------------*/