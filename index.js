let lastKeyDown = '';
document.addEventListener('keydown',(e)=>{
  lastKeyDown = e.key;
});

const nameRegex = new RegExp(`([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+`);
const fNameInputGroup = document.querySelector(`.inputGroup[data-input="fName"]`);
  const fNameInput = fNameInputGroup.querySelector(`input`);
  const fNameLabel = fNameInputGroup.querySelector(`label`);
const lNameInputGroup = document.querySelector(`.inputGroup[data-input="lName"]`);
  const lNameInput = lNameInputGroup.querySelector(`input`);
  const lNameLabel = lNameInputGroup.querySelector(`label`);
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

const numberRegex = new RegExp(`[0-9]`);
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

