let email = "abc@gmail.com";
let password = "abc123";

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");


signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";

  document.querySelector("#loginEmail").value = "";
  document.querySelector("#loginPassword").value = "";
});

loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});

signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

let forms = document.querySelectorAll("form");

forms[0].addEventListener("submit", login);

// function login(event){
//   event.preventDefault();
//   let mail = document.querySelector("#loginEmail");
//   let pass = document.querySelector("#loginPassword");

//   if(mail.value == email && pass.value == password){
//     document.querySelector("#success").classList.add("open-success");
//   } else {
//     document.querySelector("#error").classList.add("open-error");
//   }
// }

function closeSuccess(){
  document.querySelector("#success").classList.remove("open-success");
}

function closeError(){
  document.querySelector("#error").classList.remove("open-error");
}


function login(event) {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPassword").value.trim();

  const payload = {
    email,
    password
  };

  fetch("http://localhost:8080/safar/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (!res.ok) throw new Error("Invalid login credentials");
    return res.json();
  })
  .then(data => {
    console.log("Login Success:", data);
    document.querySelector("#success").classList.add("open-success");
  })
  .catch(err => {
    console.error("Login failed:", err);
    document.querySelector("#error").classList.add("open-error");
  });
}






document.querySelector("#signupForm").addEventListener("submit", signupUser);

function signupUser(event) {
  event.preventDefault();

  const fullName = document.querySelector("#signupName").value.trim();
  const email = document.querySelector("#signupEmail").value.trim();
  const mobile = document.querySelector("#signupMobile").value.trim();
  const password = document.querySelector("#signupPassword").value.trim();

  // Split full name into firstName and lastName
  const [firstName, ...rest] = fullName.split(" ");
  const lastName = rest.join(" ");

  const payload = {
    firstName,
    lastName,
    mobile,
    email,
    password
  };

  fetch("http://localhost:8080/safar/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (!res.ok) throw new Error("Signup failed",payload);
    return res.json();
  })
  .then(data => {
    console.log("Registered User:", data);
    document.querySelector("#success").classList.add("open-success");
  })
  .catch(err => {
    console.error("Error:", err);
    document.querySelector("#error").classList.add("open-error");
  });
}
