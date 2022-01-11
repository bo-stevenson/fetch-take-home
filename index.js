




getFormInfo = () => {

let queryURL = "https://cors-anywhere.herokuapp.com/" + "https://frontend-take-home.fetchrewards.com/form";
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

    for(let i=0; i<occupations.length; i++) {
        let option = occupations[i];
        let el = document.createElement("option");
        el.textContent = option;
        el.value = option;
        selectOct.appendChild(el);
    }

    for(let i=0; i<states.length; i++) {
        let option = states[i];
        let el = document.createElement("option")
        el.textContent = option.name;
        el.value = option.name;
        selectState.appendChild(el);
    }


})
}
getFormInfo();