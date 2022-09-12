const submitBtn = document.querySelector(`button[type="submit"]`);
let lastKeyDown = '';
document.addEventListener('keydown',(e)=>{
  lastKeyDown = e.key;
});

const invalidNameCharsRegex = new RegExp(/[!@#$%&\*\(\)+={};<>?/\\]/);
const numberRegex = new RegExp(/[0-9]/);
const upperCaseRegex = new RegExp(/[A-Z]/);
const lowerCaseRegex = new RegExp(/[a-z]/);
const specialCharRegex = new RegExp(/[^a-zA-Z0-9]/);
const validEmailRegex = new RegExp(/.*@.*/);
const phoneNumberRegex = new RegExp(/\(\d{3}\)\d{3}\-\d{4}/);

//NAME INPUT LOGIC
const fNameInputGroup = document.querySelector(`.inputGroup[data-input="fName"]`);
  const fNameInput = fNameInputGroup.querySelector(`input`);
  const fNameLabel = fNameInputGroup.querySelector(`.labelWrapper`);
  const fNameMessage = fNameInputGroup.querySelector(`.inputNoticeMessage`);
const lNameInputGroup = document.querySelector(`.inputGroup[data-input="lName"]`);
  const lNameInput = lNameInputGroup.querySelector(`input`);
  const lNameLabel = lNameInputGroup.querySelector(`.labelWrapper`);
  const lNameMessage = lNameInputGroup.querySelector(`.inputNoticeMessage`);
fNameInput.addEventListener(`blur`, (e)=>{
  let validation = validateName(e.target.value);
  toggleLabelValidityAndUpdateMessage(validation.valid, fNameLabel, fNameMessage, validation.message);
  isFormReady();
  return;
})
lNameInput.addEventListener(`blur`, (e)=>{
  let validation = validateName(e.target.value);
  toggleLabelValidityAndUpdateMessage(validation.valid, lNameLabel, lNameMessage, validation.message);
  isFormReady();
  return;
})

//EMAIL INPUT LOGIC
const emailInputGroup = document.querySelector(`.inputGroup[data-input="email"]`);
  const emailInput = emailInputGroup.querySelector(`input`);
  const emailLabel = emailInputGroup.querySelector(`.labelWrapper`);
  const emailMessage = emailInputGroup.querySelector(`.inputNoticeMessage`);
  emailInput.addEventListener(`blur`, (e)=>{
    let valid = validEmailRegex.test(e.target.value)
    let messageContent = valid ? ``: `Please enter a valid email address`;
    toggleLabelValidityAndUpdateMessage(valid, emailLabel, emailMessage, messageContent);
    isFormReady();
    return;
  })

//PHONE INPUT LOGIC
const phoneInputGroup = document.querySelector(`.inputGroup[data-input="phone"]`);
  const phoneInput = phoneInputGroup.querySelector(`input`);
  const phoneLabel = phoneInputGroup.querySelector(`.labelWrapper`);
  const phoneMessage = phoneInputGroup.querySelector(`.inputNoticeMessage`);
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
  if(e.target.value.length === 13 && phoneNumberRegex.test(e.target.value)){
    phoneMessage.textContent = ``;
    if(!phoneLabel.classList.contains(`valid`)){
      phoneLabel.classList.toggle(`valid`);
    }
    if(phoneLabel.classList.contains(`invalid`)){
      phoneLabel.classList.toggle(`invalid`);
    }
  } else {
    phoneMessage.textContent = `Please enter a complete valid phone number`;
    if(!phoneLabel.classList.contains(`invalid`)){
      phoneLabel.classList.toggle(`invalid`);
    }
    if(phoneLabel.classList.contains(`valid`)){
      phoneLabel.classList.toggle(`valid`);
    }
  }
  isFormReady();
  return;
})

//PASSWORD LOGIC 
const passwordInputGroup = document.querySelector(`.inputGroup[data-input="password"]`);
  const passwordInput = passwordInputGroup.querySelector(`input`);
  const passwordLabel = passwordInputGroup.querySelector(`.labelWrapper`);
const confirmPasswordInputGroup = document.querySelector(`.inputGroup[data-input="passwordConfirm"]`);
  const confirmPasswordInput = confirmPasswordInputGroup.querySelector(`input`);
  const confirmPasswordLabel = confirmPasswordInputGroup.querySelector(`.labelWrapper`);
const lengthMessage = document.querySelector(`.checkLength`);
const uppercaseMessage = document.querySelector(`.checkUppercase`);
const lowercaseMessage = document.querySelector(`.checkLowercase`);
const digitMessage = document.querySelector(`.checkDigit`);
const specialCharacterMessage = document.querySelector(`.checkSpecialCharacter`);
const matchesMessage = document.querySelector(`.checkMatch`);
passwordInput.addEventListener(`blur`, (e)=>{
  let hasLength = false;
  let hasUppercase = false;
  let hasLowercase = false;
  let hasDigit = false;
  let hasSpecialCharacter = false;
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
  if(hasLength && hasUppercase && hasLowercase && hasDigit && hasSpecialCharacter){
    if(passwordLabel.classList.contains(`invalid`)){passwordLabel.classList.toggle(`invalid`)}
    if(!passwordLabel.classList.contains(`valid`)){passwordLabel.classList.toggle(`valid`)}
  } else {
    if(passwordLabel.classList.contains(`valid`)){passwordLabel.classList.toggle(`valid`)}
    if(!passwordLabel.classList.contains(`invalid`)){passwordLabel.classList.toggle(`invalid`)}
  }
  toggleMessageValidity(hasLength, lengthMessage);
  toggleMessageValidity(hasUppercase, uppercaseMessage);
  toggleMessageValidity(hasLowercase, lowercaseMessage);
  toggleMessageValidity(hasDigit, digitMessage);
  toggleMessageValidity(hasSpecialCharacter, specialCharacterMessage);
  isFormReady();
  return;
  
})
confirmPasswordInput.addEventListener(`blur`, (e)=>{
  let hasMatch = confirmPasswordInput.value === passwordInput.value;
  if(hasMatch){
    if(confirmPasswordLabel.classList.contains(`invalid`)){confirmPasswordLabel.classList.toggle(`invalid`)}
    if(!confirmPasswordLabel.classList.contains(`valid`)){confirmPasswordLabel.classList.toggle(`valid`)}
  } else {
    if(confirmPasswordLabel.classList.contains(`valid`)){confirmPasswordLabel.classList.toggle(`valid`)}
    if(!confirmPasswordLabel.classList.contains(`invalid`)){confirmPasswordLabel.classList.toggle(`invalid`)}
  }
  toggleMessageValidity(hasMatch, matchesMessage);
  isFormReady();
  return;
})




function validateName(name){
  if(!(name.length > 2 && name.length < 30)){
    return {
      valid: false,
      message: `Names are between 2 and 30 characters`
    }
  }

  if(!upperCaseRegex.test(name.slice(0,1))){
    return {
      valid: false,
      message: `Names must start with an Uppercase Letter`
    }
  }

  let arr = [...name.matchAll(invalidNameCharsRegex.source)];
  if(arr.length > 0){
    arr = [... new Set(arr.map(entry => {return entry[0]}))];
    return {
      valid: false,
      message: `Names cannot contain the following characters: ${arr.toString()}`
    }
  }

  return {
    valid: true,
    message: ``
  }
}
function toggleMessageValidity(isValid, message){
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
function toggleLabelValidityAndUpdateMessage(isValid, label, message, messageContent){
  if(isValid){
    if(label.classList.contains(`invalid`)){label.classList.toggle(`invalid`)}
    if(!label.classList.contains(`valid`)){label.classList.toggle(`valid`)}
  } else {
    if(label.classList.contains(`valid`)){label.classList.toggle(`valid`)}
    if(!label.classList.contains(`invalid`)){label.classList.toggle(`invalid`)}
  }
  message.textContent = messageContent;
}
function validateSignUpForm(event){
  if(!submitBtn.classList.contains(`valid`)){
    return false;
  }
}
function isFormReady(){
  let valid = fNameLabel.classList.contains(`valid`) &&
    lNameLabel.classList.contains(`valid`) &&
    emailLabel.classList.contains(`valid`) &&
    phoneLabel.classList.contains(`valid`) &&
    passwordLabel.classList.contains(`valid`) &&
    confirmPasswordLabel.classList.contains(`valid`);
  if(valid){
    if(!submitBtn.classList.contains(`valid`)){submitBtn.classList.toggle(`valid`);}
  } else {
    if(submitBtn.classList.contains(`valid`)){submitBtn.classList.toggle(`valid`);}
  }
}