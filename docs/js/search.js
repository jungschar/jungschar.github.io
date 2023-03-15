const searchForm = document.getElementById('search-form');

myForm.addEventListener('submit', function(event) {

    // prevent the form from submitting
    event.preventDefault(); 

    // get the form data
    const formData = new FormData(myForm);
    const params = {};

    // iterate over the form data to build the params object
    for (const [key, value] of formData.entries()) {
        params[key] = value;
    }

    // temporarily log the params object
    console.log(params);

});
