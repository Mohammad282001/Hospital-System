let submitBtn = document.getElementById("submit");
let patient = {};
function render() {
    patient.fullName = document.getElementById("full-name").value;
    patient.password = document.getElementById("password").value;
    patient.bod = document.getElementById("dob").value;
    patient.gender = document.getElementById("gender").value;
    patient.phone = document.getElementById("phone").value;
    patient.chronicDiseases = document.getElementById("chronic-diseases").value;


}

submitBtn.onclick = function (event) { 
    render();
    event.preventDefault();
    const myJSON = JSON.stringify(patient);
    
    localStorage.setItem("testJSON", myJSON);
    let text = localStorage.getItem("testJSON");
    let obj = JSON.parse(text);
}

console.log(Object.values(patient));
