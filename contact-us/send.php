<?php
// Get form fields and remove whitespace.
$name = trim($_POST["firstname"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$message = trim($_POST["message"]);

// Validate form data
if (empty($name) || empty($email) || empty($message)) {
  http_response_code(400);
  echo "Please complete the form.";
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo "Invalid email address.";
  exit;
}

// Compose the email
$recipient = "cajiao.global@gmail.com";
$subject = "New Contact Form Submission from $name";
$email_content = "Name: $name\n";
$email_content .= "Phone: $phone\n";
$email_content .= "Email: $email\n\n";
$email_content .= "Message:\n$message\n";

$email_headers = "From: $name <$email>";

// Send the email
if (mail($recipient, $subject, $email_content, $email_headers)) {
  http_response_code(200);
  echo "Thank you! Your message has been sent.";
} else {
  http_response_code(500);
  echo "Oops! Something went wrong and we couldn't send your message.";
}
?>
