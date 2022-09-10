let lastKeyDown = '';
document.addEventListener('keydown',(e)=>{
  lastKeyDown = e.key;
});

const nameRegex = new RegExp(`([A-Z,À-ÿ][-,a-z. ']+[ ]*)+`);
const numberRegex = new RegExp(`[0-9]`);
const upperCaseRegex = new RegExp(`[A-Z]`);
const lowerCaseRegex = new RegExp(`[a-z]`);
const specialCharRegex = new RegExp(`[^a-zA-Z0-9]`);

//NAME INPUT LOGIC
const fNameInputGroup = document.querySelector(`.inputGroup[data-input="fName"]`);
  const fNameInput = fNameInputGroup.querySelector(`input`);
  const fNameLabel = fNameInputGroup.querySelector(`.labelWrapper`);
const lNameInputGroup = document.querySelector(`.inputGroup[data-input="lName"]`);
  const lNameInput = lNameInputGroup.querySelector(`input`);
  const lNameLabel = lNameInputGroup.querySelector(`.labelWrapper`);
fNameInput.addEventListener(`blur`, (e)=>toggleValidityOnBlur(fNameInput, fNameLabel))
lNameInput.addEventListener(`blur`, (e)=>toggleValidityOnBlur(lNameInput, lNameLabel))
function toggleValidityOnBlur(input, label){
  if(nameRegex.test(input.value)){
    if(!label.classList.contains(`valid`)){
      label.classList.toggle(`valid`);
    }
    if(label.classList.contains(`invalid`)){
      label.classList.toggle(`invalid`);
    }
  } else {
    if(!label.classList.contains(`invalid`)){
      label.classList.toggle(`invalid`);
    }
    if(label.classList.contains(`valid`)){
      label.classList.toggle(`valid`);
    }
  }
}  


//PHONE INPUT LOGIC
const phoneInputGroup = document.querySelector(`.inputGroup[data-input="phone"]`);
  const phoneInput = phoneInputGroup.querySelector(`input`);
  const phoneLabel = phoneInputGroup.querySelector(`label`);
const maskMap = new Map();
  maskMap.set(`0`, `(`);
  maskMap.set(`4`, `)`);
  maskMap.set(`8`, `-`)
phoneInput.addEventListener('input', (e)=>{
  let str = e.target.value;
  if(lastKeyDown === `Backspace`){
    if(str !== ``){
      if(str.length === 1 || str.length === 4 || str.length === 8){
        e.target.value = str.slice(0, str.length-1);
      }
    } 
  } else if (numberRegex.test(lastKeyDown) && str.length <= 13){
    switch(str.length){
      case 1: {
        e.target.value = `(` + str;
        break;
      }
      case 4: {
        e.target.value = str + `)`;
        break;
      }
      case 8: {
        e.target.value = str + '-';
        break;
      }
    }
  } else {
    e.target.value = str.slice(0, str.length-1);
  }
});
phoneInput.addEventListener(`blur`, (e)=>{
  if(e.target.value.length === 13){
    if(!phoneLabel.classList.contains(`valid`)){
      phoneLabel.classList.toggle(`valid`);
    }
    if(phoneLabel.classList.contains(`invalid`)){
      phoneLabel.classList.toggle(`invalid`);
    }
  } else {
    if(!phoneLabel.classList.contains(`invalid`)){
      phoneLabel.classList.toggle(`invalid`);
    }
    if(phoneLabel.classList.contains(`valid`)){
      phoneLabel.classList.toggle(`valid`);
    }
  }
})


//PASSWORD LOGIC 
const passwordInputGroup = document.querySelector(`.inputGroup[data-input="password"]`);
  const passwordInput = passwordInputGroup.querySelector(`input`);
  const passwordLabel = passwordInputGroup.querySelector(`.labelWrapper`);
const confirmPasswordInputGroup = document.querySelector(`.inputGroup[data-input="passwordConfirm"]`);
  const confirmPasswordInput = confirmPasswordInputGroup.querySelector(`input`);
  const confirmPasswordLabel = confirmPasswordInputGroup.querySelector(`.labelWrapper`);
let hasLength = false;
const lengthMessage = document.querySelector(`.checkLength`);
let hasUppercase = false;
const uppercaseMessage = document.querySelector(`.checkUppercase`);
let hasLowercase = false;
const lowercaseMessage = document.querySelector(`.checkLowercase`);
let hasDigit = false;
const digitMessage = document.querySelector(`.checkDigit`);
let hasSpecialCharacter = false;
const specialCharacterMessage = document.querySelector(`.checkSpecialCharacter`);
let hasMatches = false;
const matchesMessage = document.querySelector(`.checkMatch`);

passwordInput.addEventListener(`blur`, (e)=>{
  hasLength = false;
  hasUppercase = false;
  hasLowercase = false;
  hasDigit = false;
  hasSpecialCharacter = false;
  let str = e.target.value;
  hasLength = str.length >= 7;
  for(let i = 0; i < str.length; i++){
    let c = str.slice(i, i+1);
    if(!hasUppercase){
      hasUppercase = upperCaseRegex.test(c);
    }
    if(!hasLowercase){
      hasLowercase = lowerCaseRegex.test(c);
    }
    if(!hasDigit){
      hasDigit = numberRegex.test(c);
    }
    if(!hasSpecialCharacter){
      hasSpecialCharacter = specialCharRegex.test(c);
    }
  }

  doToggle(hasLength, lengthMessage);
  doToggle(hasUppercase, uppercaseMessage);
  doToggle(hasLowercase, lowercaseMessage);
  doToggle(hasDigit, digitMessage);
  doToggle(hasSpecialCharacter, specialCharacterMessage);

  function doToggle(isValid, message){
    if(isValid){
      if(!message.classList.contains(`valid`)){
        message.classList.toggle(`valid`);
      }
      if(message.classList.contains(`invalid`)){
        message.classList.toggle(`invalid`);
      }
    }
    else{
      if(!message.classList.contains(`invalid`)){
        message.classList.toggle(`invalid`);
      }
      if(message.classList.contains(`valid`)){
        message.classList.toggle(`valid`);
      }
    }
  }
})
