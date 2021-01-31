let users = []

let form = document.getElementById('form');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let check = false;
let list = document.querySelector('#list');
let change = false;
let userId; 
let btn = document.getElementById('btn');
let h = document.getElementById('h');


const listelement = () => { 
    list.innerHTML = ''

    users.forEach(user => {
        list.innerHTML += `
            <div id="${user.id}" class="userbox">
                <div class="userinput">
                    <h4> ${user.firstName} ${user.lastName}</h4>
                    <h6>${user.email}</h6>
                    <p class="uid">${user.id}</p>
                </div>
                <div class="changeandremove">
                    <button class="change">Change</button>
                    <button class="remove">Remove</button>
                </div>
            </div>`  
    });
}
listelement();


form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(change === true) {
        users = changeInput(userId)
        btn.innerText='Submit';
        h.innerText='Create Account';

        change = false;
        listelement();

        removeinput(firstName);
        removeinput(lastName);
        removeinput(email);

        firstName.value = '';
        lastName.value = '';
        email.value = '';

        return
    }

    checkInputs();

    if (check == true) {
        removeinput(firstName);
        removeinput(lastName);
        removeinput(email);

        if(users.some(user => user.email === email.value)){
            setErrorFor(email, `Denna email finns redan registrerad!`);
            return false
        }

        let newuser = {
            id: uuidv4(),
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value
        }
        users.push(newuser);
        listelement();

        firstName.value = '';
        lastName.value = '';
        email.value = '';
    }
});

function removeinput(input) {
    let formControl = input.parentElement;
    formControl.className = 'form-control';
}


function checkInputs() {
    let firstNameValue = firstName.value.trim();
    let lastNameValue = lastName.value.trim();
    let emailValue = email.value.trim();

    if(firstNameValue === ``) {
    setErrorFor(firstName, `Du måste fylla i ditt förnamn!`);

    } else {
        setSuccessFor(firstName);
    }

    if(lastNameValue === ``) {
        setErrorFor(lastName, `Du måste fylla i ditt efternamn!`);
    
    } else {
        setSuccessFor(lastName);
    }

    if(emailValue === ``) {
        setErrorFor(email, `Du måste fylla i din email!`);
    
    } else if(!isEmail(emailValue)) {
        setErrorFor(email, `Du måste fylla i en giltig email!`);

    } else {
        setSuccessFor(email);
    }
}
    
function setErrorFor(input, message) {
    let formControl = input.parentElement;
    let small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
    check = false;
}

function setSuccessFor(input) {
    let formControl = input.parentElement;
    formControl.className = 'form-control success';
    check = true;
}

function isEmail(email) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

list.addEventListener('click', (e) => {

    if(e.target.classList.contains('remove')){
        users = users.filter(newuser => newuser.id !== e.target.parentNode.parentNode.id)
        listelement();
    }
    else if(e.target.classList.contains('change')) {
        btn.innerText='Spara ändringar';
        h.innerText='Ändra dina uppgifter';

        change = true
        userId = e.target.parentNode.parentNode.id;

        let user = users.find(user => user.id == e.target.parentNode.parentNode.id)
        let firstName = user.firstName;
        let lastName = user.lastName;
        let email = user.email;

        document.querySelector('#firstname').value=firstName;
        document.querySelector('#lastname').value=lastName;
        document.querySelector('#email').value=email;

    }

})

function changeInput(id){
    return users.map(user => {
        if(user.id === id)
        return {
            id: user.id,
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value
        }
        return user;
    })
}