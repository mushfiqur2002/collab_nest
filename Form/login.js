let sumbitForms = document.querySelectorAll('form');

sumbitForms.forEach(fomr => {
    fomr.addEventListener('submit', function(){
        event.preventDefault();

        let targetFormId = event.target.id;
        let targetFormData = new FormData(event.target);


        if(targetFormId == 'guest'){
            handelGuestLogin(targetFormData);
        }else if(targetFormId == 'versity'){
            handelVersityLogin(targetFormData);
        }
    });
});

function handelGuestLogin(data){
    console.log('guest log in', Object.fromEntries(data.entries()));
}

function handelVersityLogin(data){
    console.log('versity log in', Object.fromEntries(data.entries()));
}


