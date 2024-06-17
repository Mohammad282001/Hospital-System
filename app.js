let form = document.getElementById("patient-form");

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
    
    fullName = document.getElementById("full-name").value;
    password = document.getElementById("password").value;
    bod = document.getElementById("dob").value;
    gender = document.getElementById("gender").value;
    phone = document.getElementById("phone").value;
    chronicDiseases = document.getElementById("chronic-diseases").value;

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
let readPatientsArr = JSON.parse(localStorage.getItem("patient"));
let patientInfoForm = document.getElementById("patient-form");
let divSection = document.createElement("section");
divSection.className = "patient-section"
patientInfoForm.after(divSection);
function creatingDivs(info)
{
    let properties = ["fullName", "password", "bod", "gender", "phone", "chronicDiseases"];
    let patientDiv = document.createElement("div");
    patientDiv.className = "patient"
    let ul = document.createElement("ul")
    let img = new Image();
    if (info.gender == "male") {
        img.src = "imgs/malePa.png"
    }
    else { 
        img.src = "imgs/femalePa.png"
    }
    patientDiv.appendChild(img);
    patientDiv.appendChild(ul);
    for (let i = 0; i < properties.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = properties[i] +": "+ info[properties[i]];
        ul.appendChild(li);
    }
    divSection.appendChild(patientDiv);
    img.style.width = "100px"
}
for (let i = 0; readPatientsArr !=null && i < readPatientsArr.length ; i++) {
    creatingDivs(readPatientsArr[i]);
}
form.addEventListener("submit", render);