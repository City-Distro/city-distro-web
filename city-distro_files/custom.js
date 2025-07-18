  // Function to create and show toast
  function showToast(message) {
    // If a toast already exists, remove it
    const existingToast = document.querySelector(".custom-toast");
    if (existingToast) existingToast.remove();

    // Create new toast
    const toast = document.createElement("div");
    toast.className = "custom-toast";
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation (optional fade in/out)
    setTimeout(() => {
      toast.classList.add("visible");
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.remove("visible");
      toast.addEventListener("transitionend", () => toast.remove());
    }, 3000);
  }

  // Intercept clicks on the app store buttons
  document.addEventListener("DOMContentLoaded", () => {
    const appButtons = document.querySelectorAll(".app-button_block");

    appButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Coming soon");
      });
    });
  });


  // WAITLIST FORM SUBMISSION
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const toast = document.createElement("div");

    // Basic toast styling and class
    toast.className = "custom-toast";
    document.body.appendChild(toast);

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      fetch(form.action, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      })
        .then(() => {
          showToast("✅ You're on the waitlist!");
          form.reset();
        })
        .catch(() => {
          showToast("❌ Something went wrong. Try again.", true);
        });
    });

    function showToast(message, isError = false) {
      toast.textContent = message;
      toast.style.backgroundColor = isError ? "#ff4d4f" : "#4caf50";
      toast.style.opacity = "1";

      setTimeout(() => {
        toast.style.opacity = "0";
      }, 4000);
    }
  });
 