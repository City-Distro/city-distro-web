function showToast(message, extraClass = "") {
  const existingToast = document.querySelector(".custom-toast");
  if (existingToast) existingToast.remove();

  const toast = document.createElement("div");
  toast.className = `custom-toast ${extraClass}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  }, 10);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Intercept clicks on the app store buttons
document.addEventListener("DOMContentLoaded", () => {
  const appButtons = document.querySelectorAll(".app-button_block");

  appButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showToast("Coming soon","app-toast");
    });
  });
});

// WAITLIST FORM SUBMISSION
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const toast = document.createElement("div");

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

function showSolution(index) {
  solutions.forEach((solution, sIndex) => {
    solution.classList.toggle("cc-show", sIndex === index);
  });
  currentIndex = index;
}

function startAutoRotation() {
  clearInterval(timer); r

  timer = setInterval(() => {
    let nextIndex = (currentIndex + 1) % solutions.length;
    showSolution(nextIndex);
  }, 2000);
}

numberBlocks.forEach((block, index) => {
  block.setAttribute("data-challenge", index + 1);

  block.addEventListener("mouseenter", () => {
    showSolution(index);
  });

  block.addEventListener("click", () => {
    showSolution(index);
  });
});

showSolution(0); 


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


  document.addEventListener("DOMContentLoaded", function () {
    const tabLinks = document.querySelectorAll(".w-tab-link");
    const tabPanes = document.querySelectorAll(".w-tab-pane");

    tabLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = this.getAttribute("data-w-tab");

        // Remove active states from all tabs
        tabLinks.forEach((l) => l.classList.remove("w--current"));
        tabPanes.forEach((pane) => pane.classList.remove("w--tab-active"));

        // Add active state to clicked tab
        this.classList.add("w--current");
        const activePane = document.querySelector(
          `.w-tab-pane[data-w-tab="${target}"]`
        );
        if (activePane) {
          activePane.classList.add("w--tab-active");
        }
      });
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

  //ECO CARDS SCROLLING ANIMATION
  document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector('.eco-card_block');
    let scrollStep = 1;
    let scrollDelay = 5; 
    let pauseBetweenScrolls = 1000; 

    function autoScroll() {
      let scrollInterval = setInterval(() => {
        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {

          scrollContainer.scrollTop = 0;
          clearInterval(scrollInterval);
          setTimeout(autoScroll, pauseBetweenScrolls);
        } else {
          scrollContainer.scrollTop += scrollStep;
        }
      }, scrollDelay);
    }

    setTimeout(autoScroll, pauseBetweenScrolls); 
  });
