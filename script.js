function showSection(section) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.add("hidden");
    section.classList.remove("active");
  });
  document.getElementById(section).classList.add("active");
}

function sendMessage() {
  let email = document.getElementById("email");
  let name = document.getElementById("name");
  let message = document.getElementById("message");
  let alert = document.getElementById("alert");

  alert.innerHTML = `Thank you, we will get back to soon throught ${email.value}`;
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
    email.value = "";
    name.value= "";
    message.value = "";
  }, 3000);
}