document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  fetch("http://localhost:2000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.text())
    .then((data) => {
      alert("Message envoyé avec succès");
    })
    .catch((error) => {
      alert("Error: " + error);
    });
});
