const form = document.getElementById("form");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  const errors = getLoginFormErrors(email_input.value, password_input.value);

  if (errors.length > 0) {
    e.preventDefault();

    //-- MESSAGE GENERATOR
    const fieldLabels = {
      email: "email",
      password: "password",
      "password-length": "password (minimum 8 characters)",
    };

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

    error_message.innerText = message;
  }
});

function getLoginFormErrors(email, password) {
  let errors = [];

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

  return errors;
}
