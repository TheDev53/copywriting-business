const form = document.getElementById("form");
const firstname_input = document.getElementById("firstname-input");
const phone_input = document.getElementById("phone-input");
const email_input = document.getElementById("email-input");
const message_input = document.getElementById("message-input");
const error_message = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  const { errors, invalidPhone } = getContactFormErrors(
    firstname_input.value,
    phone_input.value,
    email_input.value,
    message_input.value
  );

  if (errors.length > 0 || invalidPhone) {
    e.preventDefault();

    const fieldLabels = {
      firstname: "name",
      phone: "phone number",
      email: "email",
      message: "message",
    };

    const missingFields = errors.map((field) => fieldLabels[field]);
    let message = "";

    if (missingFields.length > 0) {
      message += "Your ";
      if (missingFields.length === 1) {
        message += `${missingFields[0]} is required.`;
      } else if (missingFields.length === 2) {
        message += `${missingFields[0]} and ${missingFields[1]} are required.`;
      } else {
        message += `${missingFields
          .slice(0, -1)
          .join(", ")}, and ${missingFields.at(-1)} are required.`;
      }
    }

    if (invalidPhone) {
      if (message) message += " ";
      message += "Phone number format is invalid (e.g., 123-456-7890).";
    }

    error_message.innerText = message;
  }
});

function getContactFormErrors(firstname, phone, email, message) {
  const errors = [];
  let invalidPhone = false;

  if (!firstname) {
    errors.push("firstname");
    firstname_input.parentElement.classList.add("incorrect");
  } else {
    firstname_input.parentElement.classList.remove("incorrect");
  }

  if (!phone) {
    errors.push("phone");
    phone_input.parentElement.classList.add("incorrect");
  } else {
    const phonePattern = /^(\+?1\s?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
    if (!phonePattern.test(phone)) {
      invalidPhone = true;
      phone_input.parentElement.classList.add("incorrect");
    } else {
      phone_input.parentElement.classList.remove("incorrect");
    }
  }

  if (!email) {
    errors.push("email");
    email_input.parentElement.classList.add("incorrect");
  } else {
    email_input.parentElement.classList.remove("incorrect");
  }

  if (!message) {
    errors.push("message");
    message_input.parentElement.classList.add("incorrect");
  } else {
    message_input.parentElement.classList.remove("incorrect");
  }

  return { errors, invalidPhone };
}
