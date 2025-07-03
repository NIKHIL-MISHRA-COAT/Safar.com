      const loginText = document.querySelector(".title-text .login");
      const loginForm = document.querySelector("form.login");
      const loginBtn = document.querySelector("label.login");
      const signupBtn = document.querySelector("label.signup");
      const signupLink = document.querySelector(".signup-link a");

      signupBtn.onclick = () => {
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
        document.querySelector("#loginEmail").value = "";
        document.querySelector("#loginPassword").value = "";
      };

      loginBtn.onclick = () => {
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
      };

      if (signupLink) {
        signupLink.onclick = (e) => {
          e.preventDefault();
          signupBtn.click();
        };
      }

      document.querySelector("#loginForm").addEventListener("submit", login);
      document.querySelector("#signupForm").addEventListener("submit", signupUser);

      function closeSuccess() {
        document.querySelector("#success").classList.remove("open-success");
      }

      function closeError() {
        document.querySelector("#error").classList.remove("open-error");
      }

     function login(event) {
  event.preventDefault();

  const email = document.querySelector("#loginEmail").value.trim();
  const password = document.querySelector("#loginPassword").value.trim();

  fetch("http://localhost:8080/safar/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
  .then(res => {
    if (!res.ok) {
      return res.text().then(text => {
        let errorMessage = "Login failed. Please try again.";

        try {
          const errorObj = JSON.parse(text);

          // Specific error check
          if (
            errorObj.message &&
            errorObj.message.toLowerCase().includes("user already logged")
          ) {
            errorMessage = "User is already logged in from another session.";
          } else {
            errorMessage = errorObj.details || errorObj.message || errorMessage;
          }

        } catch (e) {
          errorMessage = text || errorMessage;
        }

        throw new Error(errorMessage);
      });
    }
    return res.json();
  })
  .then(data => {
    console.log("Login Success:", data);
    document.querySelector("#success .message p").innerText = "Login successful!";
    document.querySelector("#success").classList.add("open-success");
  })
  .catch(err => {
    console.error("Login failed:", err.message);
    document.querySelector("#error .message p").innerText = err.message;
    document.querySelector("#error").classList.add("open-error");
  });
}

    function signupUser(event) {
  event.preventDefault();

  const fullName = document.querySelector("#signupName").value.trim();
  const email = document.querySelector("#signupEmail").value.trim();
  const mobile = document.querySelector("#signupMobile").value.trim();
  const password = document.querySelector("#signupPassword").value.trim();

  // Split full name into first and last name
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
    if (!res.ok) {
      return res.text().then(text => {
        let errorMessage = "Signup failed. Please try again.";

        try {
          const errorObj = JSON.parse(text);
          errorMessage = errorObj.details || errorObj.message || errorMessage;
        } catch (e) {
          errorMessage = text || errorMessage;
        }

        throw new Error(errorMessage);
      });
    }
    return res.json();
  })
  .then(data => {
    console.log("Registered User:", data);
    document.querySelector("#success .message p").innerText = "Signup successful!";
    document.querySelector("#success").classList.add("open-success");
  })
  .catch(err => {
    console.error("Signup failed:", err.message);
    document.querySelector("#error .message p").innerText = err.message;
    document.querySelector("#error").classList.add("open-error");
  });
}

