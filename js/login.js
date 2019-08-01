var loginForm = document.querySelector('#login-form');
var subBtn = document.querySelector('#logSubmit');

function submitRequest () {
  let formData = new FormData(loginForm);
  let payload = new URLSearchParams(formData).toString();

  console.log("paylod for login: ", payload);
}


subBtn.addEventListener("click", submitRequest);
