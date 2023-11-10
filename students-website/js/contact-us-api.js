document
  .getElementById("contact_form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var message = document.getElementById("message").value;

    var formData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };

    fetch("http://13.51.168.236:3336/leads/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then(function (result) {
        console.log(result);
        var alertElement = document.querySelector(".alert");
        alertElement.innerHTML = "Form submitted successfully!";
        alertElement.style.display = "block";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";

        setTimeout(function () {
          alertElement.style.display = "none";
        }, 3000);
      })
      .catch(function (error) {
        console.error("Error:", error);
        var alertElement = document.querySelector(".alert");
        alertElement.innerHTML = "An error occurred. Please try again later.";
        alertElement.style.display = "block";
      });
  });
