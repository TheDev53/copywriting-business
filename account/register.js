const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeat_password_input = document.getElementById("repeat-password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  let errors = [];
  let passwordsDoNotMatch = false;

  if (firstname_input) {
    // signup form
    const result = getSignupFormErrors(
      firstname_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value
    );
    errors = result.errors;
    passwordsDoNotMatch = result.passwordsDoNotMatch;
  } else {
    // login form
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if (errors.length > 0 || passwordsDoNotMatch) {
    e.preventDefault();

    //-- MESSAGE GENERATOR
    const fieldLabels = {
      firstname: "first name",
      email: "email",
      password: "password",
      "repeat-password": "repeat password",
      "password-length": "password (minimum 8 characters)",
    };

    // Fields missing or empty (except password-length which is special)
    const missingFields = errors
      .filter((field) => fieldLabels[field] && field !== "password-length")
      .map((field) => fieldLabels[field]);

    let message = "";

    if (missingFields.length > 0) {
      message += "Your ";

      if (missingFields.length === 1) {
        message += `${missingFields[0]} is required`;
      } else if (missingFields.length === 2) {
        message += `${missingFields[0]} and ${missingFields[1]} are required`;
      } else {
        message += `${missingFields
          .slice(0, -1)
          .join(", ")}, and ${missingFields.at(-1)} are required`;
      }

      message += ".";
    }

    // Password length error message
    if (errors.includes("password-length")) {
      if (message) {
        message += " Password must be at least 8 characters long.";
      } else {
        message = "Password must be at least 8 characters long.";
      }
    }

    // Password mismatch message
    if (passwordsDoNotMatch) {
      if (message) {
        message += " Please make sure your passwords match.";
      } else {
        message = "Your passwords do not match.";
      }
    }

    error_message.innerText = message;
  }
});

function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];
  let passwordsDoNotMatch = false;

  if (!firstname) {
    errors.push("firstname");
    firstname_input.parentElement.classList.add("incorrect");
  } else {
    firstname_input.parentElement.classList.remove("incorrect");
  }

  if (!email) {
    errors.push("email");
    email_input.parentElement.classList.add("incorrect");
  } else {
    email_input.parentElement.classList.remove("incorrect");
  }

  if (!password) {
    errors.push("password");
    password_input.parentElement.classList.add("incorrect");
  } else if (password.length < 8) {
    errors.push("password-length");
    password_input.parentElement.classList.add("incorrect");
  } else {
    password_input.parentElement.classList.remove("incorrect");
  }

  if (!repeatPassword) {
    errors.push("repeat-password");
    repeat_password_input.parentElement.classList.add("incorrect");
  } else {
    repeat_password_input.parentElement.classList.remove("incorrect");
  }

  if (password && repeatPassword && password !== repeatPassword) {
    passwordsDoNotMatch = true;
    password_input.parentElement.classList.add("incorrect");
    repeat_password_input.parentElement.classList.add("incorrect");
  }

  return { errors, passwordsDoNotMatch };
}
