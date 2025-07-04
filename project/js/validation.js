// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Select all the necessary elements from the DOM
  const form = document.getElementById("signup-form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const passwordConfirm = document.getElementById("password-confirm");

  // Select the password requirement list items
  const reqLength = document.getElementById("req-length");
  const reqCapital = document.getElementById("req-capital");
  const reqNumber = document.getElementById("req-number");
  const reqSpecial = document.getElementById("req-special");

  // --- HELPER FUNCTIONS for showing errors and success ---

  // Shows an error message and adds the error class to the form-group
  const showError = (input, message) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove("success");
    formGroup.classList.add("error");
    const errorMessage = formGroup.querySelector(".error-message");
    errorMessage.textContent = message;
  };

  // Removes the error message and adds the success class
  const showSuccess = (input) => {
    const formGroup = input.parentElement;
    formGroup.classList.remove("error");
    formGroup.classList.add("success");
    const errorMessage = formGroup.querySelector(".error-message");
    errorMessage.textContent = "";
  };

  // --- VALIDATION FUNCTIONS ---

  // Check if the email format is valid using a Regular Expression (Regex)
  const validateEmail = (emailInput) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(emailInput.value).toLowerCase())) {
      showSuccess(emailInput);
      return true;
    } else if (emailInput.value === "") {
      showError(emailInput, "Email is required");
      return false;
    } else {
      showError(emailInput, "Email is not valid");
      return false;
    }
  };

  // Check password requirements in real-time
  const validatePasswordRealtime = () => {
    const value = password.value;
    // Check length
    value.length >= 8
      ? reqLength.classList.add("valid")
      : reqLength.classList.remove("valid");
    // Check for capital letter
    /[A-Z]/.test(value)
      ? reqCapital.classList.add("valid")
      : reqCapital.classList.remove("valid");
    // Check for number
    /[0-9]/.test(value)
      ? reqNumber.classList.add("valid")
      : reqNumber.classList.remove("valid");
    // Check for special character
    /[!@#$%^&*]/.test(value)
      ? reqSpecial.classList.add("valid")
      : reqSpecial.classList.remove("valid");
  };

  // Check password validity for form submission
  const validatePassword = (passwordInput) => {
    const value = passwordInput.value;
    const isLengthValid = value.length >= 8;
    const hasCapital = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*]/.test(value);

    if (isLengthValid && hasCapital && hasNumber && hasSpecial) {
      showSuccess(passwordInput);
      return true;
    } else if (value === "") {
      showError(passwordInput, "Password is required");
      return false;
    } else {
      showError(passwordInput, "Password does not meet all requirements");
      return false;
    }
  };

  // Check if passwords match
  const validatePasswordConfirm = (passwordConfirmInput) => {
    if (passwordConfirmInput.value === "") {
      showError(passwordConfirmInput, "Please confirm your password");
      return false;
    } else if (passwordConfirmInput.value !== password.value) {
      showError(passwordConfirmInput, "Passwords do not match");
      return false;
    } else {
      showSuccess(passwordConfirmInput);
      return true;
    }
  };

  // Check if username is not empty
  const validateUsername = (usernameInput) => {
    if (usernameInput.value.trim() === "") {
      showError(usernameInput, "Username is required");
      return false;
    } else {
      showSuccess(usernameInput);
      return true;
    }
  };

  // --- EVENT LISTENERS ---

  // Add a real-time listener to the password field
  password.addEventListener("input", validatePasswordRealtime);

  // Add a submit event listener to the form
  form.addEventListener("submit", (e) => {
    // Prevent the form from submitting by default
    e.preventDefault();

    // Run all validation checks
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPasswordConfirmValid = validatePasswordConfirm(passwordConfirm);

    // Check if all fields are valid
    if (
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isPasswordConfirmValid
    ) {
      // In a real application, you would send the data to a server here.
      // For this project, we just show a success message.
      alert("Sign up successful! Welcome!");
      // Optionally, reset the form
      form.reset();
      // Remove success classes after reset
      document.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("success");
      });
      document.querySelectorAll("#password-reqs li").forEach((req) => {
        req.classList.remove("valid");
      });
    }
  });
});
