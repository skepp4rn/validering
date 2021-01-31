const regForm = document.querySelector('#regForm');

regForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if(!(e.currentTarget['toc'].checked)) {
        
        return false

    }
    
    const query = 'email'


    let firstName = e.currentTarget.firstName.value;
    let lastName = e.currentTarget.lastName.value;
    let email = e.currentTarget[query].value;

    
    let user = {
        firstName: e.currentTarget.firstName.value,
        lastName: e.currentTarget.lastName.value,
        email: e.currentTarget.email.value,
        role: e.currentTarget.role.value
    }

    console.log(user) 

})