const passwordForm = document.getElementById("password_form");
const rsvpForm = document.getElementById("rsvp_form");
passwordForm.addEventListener("submit", enterPassword);

function checkPassword() {
    let submittedPassword = document.getElementById("password");
    // If you're reading this, I know this isn't a secure way to do a password check. Shut Up.
    // It's mostly for show and to prevent bots anyway!
    const password = "password";
    if (password !== submittedPassword.value) {
            alert("Password is incorrect, please check your invite!");
        submittedPassword.value = "";
        return false;
    }
    return true;
}

function enterPassword(event) {
    event.preventDefault();
    if (checkPassword()) {
        console.log("correct password")
        passwordForm.classList.add("hidden");
        rsvpForm.hidden = false;
        rsvpForm.classList.remove("hidden");
    }
}

const attendingSelect = document.getElementById("attending");
attendingSelect.addEventListener("change", attendingChange);
const attendingYes = document.getElementById("attending_yes");
const attendingNo = document.getElementById("attending_no");

function attendingChange() {
    if (attendingSelect.value === "yes") {
        attendingYes.classList.remove("hidden");
        attendingNo.classList.add("hidden");
        createPersonInputs();
    } else {
        attendingNo.classList.remove("hidden");
        attendingYes.classList.add("hidden");
    }
}

const partySizeInput = document.getElementById("partySize");
partySizeInput.addEventListener("change", partySizeChange);
const partyDetailsSection = document.getElementById("party_details");

function partySizeChange() {
    // find number of inputs and add/remove as needed
    let partySize = partySizeInput.value;
    let currentInputs = document.querySelectorAll(".person-input");
    if (currentInputs.length > partySize) {
        // remove inputs
        for (let i = currentInputs.length - 1; i >= partySize; i--) {
            currentInputs[i].remove();
        }
    } else if (currentInputs.length < partySize) {
        // add inputs
        for (let i = currentInputs.length; i < partySize; i++) {
            addPersonInput(i);
        }
    }
}

const personInputTemplate = document.getElementById("person_input_template");
function createPersonInputs() {
    let partySize = partySizeInput.value;
    console.log(partySize);
    for (let i = 0; i < partySize; i++) {
        addPersonInput(i);
    }
}

function addPersonInput(number){
    let thisPerson = personInputTemplate.cloneNode(true);
    thisPerson.id="person_" + number;
    thisPerson.classList.remove("hidden");
    thisPerson.classList.add("person-input","form-section");
    thisPerson.querySelector("h2").innerText = "Person " + (number + 1);
    partyDetailsSection.appendChild(thisPerson);
}
