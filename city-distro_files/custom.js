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
