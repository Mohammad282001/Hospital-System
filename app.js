let form = document.getElementById("patient-form");
let readPatientsArr = JSON.parse(localStorage.getItem("patient"));
let patientInfoForm = document.getElementById("patient-form");
let divSection = document.createElement("section");
divSection.className = "patient-section"
patientInfoForm.after(divSection);

// creating a constructor 
function Patients(fullName,password,bod,gender,phone,chronicDiseases ) {
    this.fullName = fullName;
    this.password = password;
    this.bod = bod;
    this.gender = gender;
    this.phone = phone;
    this.chronicDiseases = chronicDiseases;
}
function render(event) {
    event.preventDefault();
    
    fullName = document.getElementById("full-name").value.trim();
    password = document.getElementById("password").value.trim();
    bod = document.getElementById("dob").value.trim();
    gender = document.getElementById("gender").value.trim();
    phone = document.getElementById("phone").value.trim();
    chronicDiseases = document.getElementById("chronic-diseases").value.trim();


    if (!validateUsername(fullName)) {
        alert("Username cannot contain spaces.");
        return;
    }

    if (!validatePassword(password)) {
        alert("Password must be more than 8 characters long and include at least one number, uppercase letter, and special character.");
        return;
    }

    if (!validateBirthday(bod)) {
        alert("Date of Birth must be in YYYY-MM-DD format.");
        return;
    }

    if (!validatePhone(phone)) {
        alert("Phone number must be 10 digits starting with 07.");
        return;
    }

    if (isUserExists(fullName)) {
        alert("User already exists.");
        return;
    }




    let patient = new Patients(fullName, password, bod, gender, phone, chronicDiseases);
    let patientsArr = localStorage.getItem("patient") == null ? [] : JSON.parse(localStorage.getItem("patient"));

    let patientsArr2 = localStorage.getItem("patient");
    if (patientsArr2 == null)
        patientsArr2 = [];
    else
        patientsArr2 = JSON.parse(localStorage.getItem("patient"))

    patientsArr.push(patient);
    localStorage.setItem("patient", JSON.stringify(patientsArr));

    location.reload();

}


function displayPatient(info)
{
    let properties = ["fullName", "password", "bod", "gender", "phone", "chronicDiseases"];
    let listData = ["Full Name", "Password", "Date of birth", "Gender", "Phone", "Chronic Diseases"];
    let patientDiv = document.createElement("div");
    let ul = document.createElement("ul")
    let img = new Image();

    patientDiv.className = "patient"
    img.src = info.gender == "male" ? "imgs/malePa.png" : "imgs/femalePa.png";
    patientDiv.appendChild(img);
    patientDiv.appendChild(ul);

    for (let i = 0; i < properties.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = listData[i] +": "+ info[properties[i]];
        ul.appendChild(li);
    }

    divSection.appendChild(patientDiv);
    img.style.width = "100px"
}

for (let i = 0; readPatientsArr !=null && i < readPatientsArr.length ; i++) 
    displayPatient(readPatientsArr[i]);




function validateUsername(username) {
    return !/\s/.test(username); // returns true if there is no spaces
}

function validatePassword(password) {
    let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
}

function validateBirthday(birthday) {
    let birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
    return birthdayRegex.test(birthday);
}

function validatePhone(phone) {
    let phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phone);
}

function isUserExists(username) {
    return readPatientsArr.some(patient => patient.fullName === username);
}




form.addEventListener("submit", render);

