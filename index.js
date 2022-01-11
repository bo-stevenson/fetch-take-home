
const form = document.getElementById('form');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const occupation = document.getElementById('selectOccupation');
const state = document.getElementById('selectState');
//listens for submit button 
form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("button pressed!")
    checkInputs();
    
});

function checkInputs() {
    //get values from the inputs
    const fullNameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    //check if values are empty
    if(fullNameValue === "") {
        
        setError(fullName, "Name cannot be blank");
        return;
    } else {
        setSuccess(fullName);
        
    }

    if(emailValue === "") {
        
        setError(email, "Email cannot be blank");
        return;
    } else {
        setSuccess(email);
        
    }

    if(passwordValue === "") {
        
        setError(password, "Password cannot be blank");
        return;
    } else {
        setSuccess(password);
        
    }
    postForm();

}

//sets css to display error
function setError(input, message) {
    console.log(message);
    const formControl = input.parentElement; //.formcontrol
    const small = formControl.querySelector('small');



    small.innerText = message;
    
    formControl.className = 'form-control error';
}
//sets css to display success
function setSuccess(input){
    const formControl = input.parentElement;
    
    formControl.className = "form-control success";

}
//Function to get occupation and state lists and append to select

getFormInfo = () => {

let queryURL = "https://cors-anywhere.herokuapp.com/"+"https://frontend-take-home.fetchrewards.com/form";
$.ajax({
    url:queryURL,
    method: "GET"
}).fail(function () {
    console.log("GET request failed");
}).done(function (response) {
    console.log("GET request successful");
    
    let states = response.states;
    let occupations = response.occupations;
    let selectOct = document.getElementById("selectOccupation");
    let selectState = document.getElementById("selectState");
    //loop through occupations and append to select tag
    for(let i=0; i<occupations.length; i++) {
        let option = occupations[i];
        let el = document.createElement("option");
        el.textContent = option;
        el.value = option;
        selectOct.appendChild(el);
    }
    //loop through states and append to select tag
    for(let i=0; i<states.length; i++) {
        let option = states[i];
        let el = document.createElement("option")
        el.textContent = option.name;
        el.value = option.name;
        selectState.appendChild(el);
    }


})
}
//function postForm 
const postForm = () => {
    let newUser = {
       "name": fullName.value.trim(),
       "email": email.value.trim(), 
       "password": password.value.trim(),
       "occupation": occupation.value.trim(),
       "state": state.value.trim()
   };
   
   console.log(newUser);
   return $.ajax({
       url: "https://cors-anywhere.herokuapp.com/"+"https://frontend-take-home.fetchrewards.com/form",
       data: JSON.stringify(newUser),
       method: "POST",
       contentType: "application/json",
       //dataType:"JSON",
    
   }).done(function(){
       console.log("Post success!")
       alert("Form Successfully Submitted!");
    
   });
};

getFormInfo();


