/* PRE-LOADER */
var loaderVar;
function loaderFunction() {
    loaderVar = setTimeout(showPage, 1000);
}
function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("forLoader").style.display = "block";
}

/* UPLOADING IMAGE FILE */
$(document).ready(function () {
    $('#upload-form').on('submit', function (event) {
        event.preventDefault();
        let formData = new FormData(this);
        $.ajax({
            url: '/upload-image',
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                // display uploaded image
                $('#image-preview').html('<img src="' + data + '" alt="Uploaded Image">');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Error uploading image:', errorThrown);
            }
        });
    });
    $('#image-upload').on('change', function () {
        // display preview of selected image
        document.getElementById('default_pp').style.display = "none";
        let reader = new FileReader();
        reader.onload = function (event) {
            $('#image-preview').html('<img src="' + event.target.result + '" alt="Selected Image">');
        };
        reader.readAsDataURL(this.files[0]);
    });
});


/* HIDE AND SHOW PASSWORD */
const togglePassword = document.querySelector('#toggle-password');
const passwordField = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    this.querySelector('i').classList.toggle('bi-eye');
    this.querySelector('i').classList.toggle('bi-eye-slash');
});


/* PASSWORD GENERATOR */
function generatePassword() {
    var length = 10;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    var password = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    document.getElementById("password").value = password;
}

/* GENERATING LIST USING ARRAY AND FOR LOOP */
let addressArr = ["San Carlos City", "Escalante City", "Sagay City", "Cadiz City", "Bacolod City",];
let select = document.getElementById("address");
for (let i = 0; i < addressArr.length; i++) {
    var option = document.createElement("option");
    option.text = addressArr[i];
    select.add(option);
}

/* SAVING DATA ON LOCAL STORAGE */
function saveData() {
    let name = document.getElementById("name").value;
    let number = document.getElementById("number").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    localStorage.setItem("name", name);
    localStorage.setItem("number", number);
    localStorage.setItem("address", address);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    if ((name === "") || (number === "") || (address === "-select-") ||
        (email === "") || (username === "") || (password === "")) {
        alert("You must complete filling up the form.")
    }
    else {

        alert("Your account has been created successfully." +
            "\n \n" + "Name: " + name + "\n" + "Phone Number: " +
            number + "\n" + "Address: " + address + "\n" +
            "Email: " + email + "\n" + "Username: " + username +
            "\n" + "Password: " + convertToAsterisk(password));

    }
}

/* HIDING PASSWORD */
function convertToAsterisk(text) {
    var asterisk = "";
    for (var i = 0; i < text.length; i++) {
        asterisk += "*";
    }
    return asterisk;
}

/* RETRIEVEING DATA FROM LOCAL STORAGE */

const form = document.querySelector('#myForm');

const tableBody = document.querySelector('#myTable tbody');

let data = JSON.parse(localStorage.getItem('myData')) || [];

form.addEventListener('submit', e => {
    e.preventDefault();

    const name = form.elements['name'].value;
    const number = form.elements['number'].value;
    const address = form.elements['address'].value;
    const email = form.elements['email'].value;
    const username = form.elements['username'].value;
    const password = form.elements['password'].value;

    const newData = {
        name: name,
        number: number,
        address: address,
        email: email,
        username: username,
        password: password
    };

    data.push(newData);

    localStorage.setItem('myData', JSON.stringify(data));

    const row = tableBody.insertRow();

    const namecell = row.insertCell();
    const numbercell = row.insertCell();
    const addresscell = row.insertCell();
    const emailcell = row.insertCell();
    const usernamecell = row.insertCell();
    const passwordcell = row.insertCell();

    namecell.textContent = name;
    numbercell.textContent = number;
    addresscell.textContent = address;
    emailcell.textContent = email;
    usernamecell.textContent = username;
    passwordcell.textContent = convertToAsterisk(password);

    form.reset();
});

/* DARK MODE */
function changeMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}
