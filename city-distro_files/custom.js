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

const numberBlocks = document.querySelectorAll(".challenge-card-list_block1");
const solutions = document.querySelectorAll(".solution");

let currentIndex = 0;
let timer;

// 🔁 Function to show a specific index
function showSolution(index) {
  solutions.forEach((solution, sIndex) => {
    solution.classList.toggle("cc-show", sIndex === index);
  });
  currentIndex = index;
}

// ⏱ Function to start the auto-rotation timer
function startAutoRotation() {
  clearInterval(timer); // stop any previous timer

  timer = setInterval(() => {
    let nextIndex = (currentIndex + 1) % solutions.length;
    showSolution(nextIndex);
  }, 2000);
}

// 👆 Hover + Tap support for each number block
numberBlocks.forEach((block, index) => {
  block.setAttribute("data-challenge", index + 1);

  // Hover for desktop
  block.addEventListener("mouseenter", () => {
    showSolution(index);
  });

  // Tap/Click for mobile
  block.addEventListener("click", () => {
    showSolution(index);
  });
});

// ✅ Initialize
showSolution(0); // Show the first solution by default


// LOAD MORE FUNCTION
  document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".w-dyn-item");
    const loadMoreBtn = document.querySelector(".faq-pagination_block");

    // Show only first 2 items initially
    faqItems.forEach((item, index) => {
      if (index >= 4) {
        item.style.display = "none";
      }
    });

    // Add click event to load more button
    loadMoreBtn.addEventListener("click", function (e) {
      e.preventDefault();

      faqItems.forEach((item) => {
        item.style.display = "block";
      });

      // Hide the load more button
      loadMoreBtn.style.display = "none";
    });
  });


  // ANIMATION FOR THE FEATURES TABS
  document.addEventListener("DOMContentLoaded", function () {
    const tabSection = document.querySelector("#auto-tab-section"); 
    if (!tabSection) return;

    const tabLinks = tabSection.querySelectorAll(".w-tab-menu [data-w-tab]");
    const tabPanes = tabSection.querySelectorAll(".w-tab-content [data-w-tab]");
    let currentIndex = 0;
    const totalTabs = tabLinks.length;
    const delay = 2000; 

    function switchToTab(index) {
      tabLinks.forEach((link) => link.classList.remove("w--current"));
      tabPanes.forEach((pane) => pane.classList.remove("w--tab-active"));

      tabLinks[index].classList.add("w--current");
      tabPanes[index].classList.add("w--tab-active");
    }

    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalTabs;
      switchToTab(currentIndex);
    }, delay);
  });
