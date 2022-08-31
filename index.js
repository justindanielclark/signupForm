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

let phoneDataInject = false;
const numberRegex = new RegExp(`[0-9]`);
const phoneInputGroup = document.querySelector(`.inputGroup[data-input="phone"]`);
  const phoneInput = phoneInputGroup.querySelector(`input`);
  const phoneLabel = phoneInputGroup.querySelector(`label`);
const maskMap = new Map();
  maskMap.set(`0`, `(`);
  maskMap.set(`4`, `)`);
  maskMap.set(`8`, `-`)
phoneInput.addEventListener('input', (e)=>{
  if(lastKeyDown === `Backspace`){
    if(e.target.value !== ``){
      
    } 
  } else if (numberRegex.test(e.target.value[e.target.value.length-1])){

  } else {

  }
});


