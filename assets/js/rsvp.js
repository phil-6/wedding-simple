const passwordForm = document.getElementById("password_form");
const rsvpFormContainer = document.getElementById("rsvp_form");
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
        rsvpFormContainer.hidden = false;
        rsvpFormContainer.classList.remove("hidden");
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
        document.querySelector("#party_size").setAttribute("required", "required");
        document.querySelector("#camping").setAttribute("required", "required");
        createPersonInputs();
    } else {
        attendingNo.classList.remove("hidden");
        attendingYes.classList.add("hidden");
        document.querySelector("#party_size").removeAttribute("required");
        document.querySelector("#camping").removeAttribute("required");
        removePersonInputs();
    }
}

const partySizeInput = document.getElementById("party_size");
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

function removePersonInputs() {
    let currentInputs = document.querySelectorAll(".person-input");
    for (const input of currentInputs) {
        input.remove();
    }
}

function addPersonInput(number) {
    let thisPerson = personInputTemplate.cloneNode(true);
    thisPerson.id = "person_" + number;
    thisPerson.classList.remove("hidden");
    thisPerson.classList.add("person-input", "form-section");
    thisPerson.querySelector("h2").innerText = "Person " + (number + 1);
    thisPerson.querySelector("#person_name").name = "person_name_" + number;
    thisPerson.querySelector("#person_name").setAttribute("required", "required");
    thisPerson.querySelector("#person_dietary").name = "person_dietary_" + number;
    thisPerson.querySelector("#person_song").name = "person_song_" + number;
    thisPerson.querySelector("#person_under_12").name = "person_under_12_" + number;
    partyDetailsSection.appendChild(thisPerson);
}

const rsvpForm = document.rsvpForm;
rsvpForm.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();
    console.log("submitting form");
    const formData = new FormData(rsvpForm)
    console.log(formData);
    const action = event.target.action;
    fetch(action, {
        method: 'POST',
        body: formData,
    }).then(() => {
        alert("Success!");
    })
}
