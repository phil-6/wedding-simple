const passwordForm = document.getElementById("password_form");
const rsvpFormContainer = document.getElementById("rsvp_form_container");
const rsvpForm = document.rsvpForm;
const successMessage = document.getElementById("rsvp_success");
const submittingMessage = document.getElementById("rsvp_sending");

const nameField = document.getElementById("name");
const attendingSelect = document.getElementById("attending");
const attendingYes = document.getElementById("attending_yes");
const attendingNo = document.getElementById("attending_no");
const partySizeInput = document.getElementById("party_size");
const partyDetailsSection = document.getElementById("party_details");
const personInputTemplate = document.getElementById("person_input_template");

nameField.addEventListener("change", setFirstPersonName);
passwordForm.addEventListener("submit", enterPassword);
rsvpForm.addEventListener("submit", submitForm);
attendingSelect.addEventListener("change", attendingChange);
partySizeInput.addEventListener("change", partySizeChange);

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

function attendingChange() {
    if (attendingSelect.value === "yes") {
        attendingYes.classList.remove("hidden");
        attendingNo.classList.add("hidden");
        document.querySelector("#party_size").setAttribute("required", "required");
        document.querySelector("#camping").setAttribute("required", "required");
        createPersonInputs();
        setFirstPersonName();
    } else {
        attendingNo.classList.remove("hidden");
        attendingYes.classList.add("hidden");
        document.querySelector("#party_size").removeAttribute("required");
        document.querySelector("#camping").removeAttribute("required");
        removePersonInputs();
    }
}

function partySizeChange() {
    // find number of inputs and add/remove as needed
    let partySize = partySizeInput.value;
    if (partySize > 6) {
        partySize = 6;
        partySizeInput.value = 6;
    }
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

function setFirstPersonName() {
    try {
        document.getElementsByName("person_name_0")[0].value = nameField.value
    } catch (e) {
        // console.log(e)
    }
}

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
    thisPerson.querySelector("h2").innerText = "Person " + (number + 1) + "\xa0";
    thisPerson.querySelector("#person_name").name = "person_name_" + number;
    thisPerson.querySelector("#person_name").setAttribute("required", "required");
    thisPerson.querySelector("#person_dietary").name = "person_dietary_" + number;
    thisPerson.querySelector("#person_song").name = "person_song_" + number;
    thisPerson.querySelector("#person_under_12").name = "person_under_12_" + number;
    partyDetailsSection.appendChild(thisPerson);
}

function submitForm(event) {
    event.preventDefault();
    console.log("submitting form");
    const formData = new FormData(rsvpForm)
    console.log(formData);
    rsvpFormContainer.classList.add("hidden");
    submittingMessage.classList.remove("hidden");
    const action = event.target.action;
    fetch(action, {
        method: 'POST',
        body: formData,
    }).then(() => {
        submittingMessage.classList.add("hidden");
        successMessage.classList.remove("hidden");
        localStorage.setItem("rsvp_success", "true");
    })
}

function checkForPreviousSubmission() {
    if (localStorage.getItem("rsvp_success") === "true") {
        passwordForm.classList.add("hidden");
        rsvpFormContainer.remove();
        successMessage.classList.remove("hidden");
    }
}

checkForPreviousSubmission();
