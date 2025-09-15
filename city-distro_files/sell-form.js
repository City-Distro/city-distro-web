const toast = document.createElement("div");
toast.className = "custom-toast";
document.body.appendChild(toast);

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.style.backgroundColor = isError ? "#ff4d4f" : "#4caf50";
  toast.style.opacity = "1";
  setTimeout(() => (toast.style.opacity = "0"), 4000);
}

const fileInput = document.getElementById("product-images");
const triggerUpload = document.getElementById("trigger-upload");
const previewContainer = document.getElementById("preview-container");

const MAX_FILE_SIZE_MB = 5;
const MAX_IMAGES = 21;
let uploadedImageURLs = [];
let selectedFiles = [];

fileInput.addEventListener("change", function () {
  const files = Array.from(fileInput.files);
  if (selectedFiles.length + files.length > MAX_IMAGES) {
    showToast(`❌ You can upload a max of ${MAX_IMAGES} images.`, true);
    return;
  }

  for (let file of files) {
    if (!file.type.startsWith("image/")) {
      showToast(`❌ ${file.name} is not an image.`, true);
      continue;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      showToast(`❌ ${file.name} exceeds 5MB.`, true);
      continue;
    }

    selectedFiles.push(file);

    const reader = new FileReader();
    reader.onload = function (e) {
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper";

      const img = document.createElement("img");
      img.src = e.target.result;
      img.alt = "Preview";
      img.className = "preview-thumb";

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.textContent = "✖";
      removeBtn.className = "remove-image-btn";
      removeBtn.addEventListener("click", () => {
        previewContainer.removeChild(wrapper);
        selectedFiles = selectedFiles.filter((f) => f !== file);
        uploadedImageURLs = uploadedImageURLs.filter(
          (url) => !url.includes(file.name)
        );
      });

      wrapper.appendChild(img);
      wrapper.appendChild(removeBtn);
      previewContainer.appendChild(wrapper);
    };
    reader.readAsDataURL(file);

    // Upload immediately
    const cloudName = "dhtv0wl1g"
    const uploadPreset = "city_distro";
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        uploadedImageURLs.push(data.secure_url);
      })
      .catch(() => {
        showToast("❌ Upload failed. Try again.", true);
      });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("manufacturers-form");
  const submitBtn = form.querySelector('[type="submit"]');
  
  
  function handleError(message) {
    showToast("❌ " + message, true);
  }
  
  function clearForm() {
    form.reset();
    previewContainer.innerHTML = "";
    uploadedImageURLs.length = 0;
    selectedFiles.length = 0;
  }

  function isValidNigerianNumber(phone) {
    // Remove spaces just in case
    const tel = phone.trim();

    if (tel.startsWith("0")) {
      // Local format: must be 11 digits total
      return /^0\d{10}$/.test(tel);
    }

    if (tel.startsWith("+234")) {
      // International format with +234: must be 14 chars total (+ then 13 digits)
      return /^\+234\d{10}$/.test(tel);
    }

    if (tel.startsWith("234")) {
      // International format without +: must be 13 digits total
      return /^234\d{10}$/.test(tel);
    }

    return false; // If it doesn't start with 0, +234, or 234
  }
  
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = form["name"].value.trim();
    const quantity = parseInt(form["Quantity"].value.trim(), 10);
    const costPrice = parseFloat(form["Cost-Price-NGN"].value.trim());
    const retailPrice = parseFloat(
      form["Recommended-Retail-Price-NGN"].value.trim()
    );
    const city = form["City-of-Address"].value.trim();
    const pickupLocation = form["Item-Pickup-Location"].value.trim();
    const companyName = form["Company-Name"].value.trim();
    const nafdac = form["nafdac-registration-number"]?.value.trim() || "";
    const telephone = form["telephone-number"].value.trim();
    const email = form["email-address"].value.trim();

    // === VALIDATIONS ===
    if (name.length < 3 || name.length > 50) {
      return handleError("Product name must be 3–50 characters.");
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return handleError("Quantity must be a positive whole number.");
    }

    if (isNaN(costPrice) || costPrice <= 0) {
      return handleError("Cost price must be greater than zero.");
    }

    if (isNaN(retailPrice) || retailPrice <= 0) {
      return handleError("Retail price must be greater than zero.");
    }

    if (retailPrice <= costPrice) {
      return handleError("Retail price must be higher than cost.");
    }

    if (city.length < 2 || pickupLocation.length < 2) {
      return handleError("City and pickup location are too short.");
    }
    
    // ✅ Company Name
    if (companyName.length < 3 || companyName.length > 25) {
      return handleError("Company name must be 3–25 characters.");
    }

    if (nafdac.length < 5) {
      return handleError("NAFDAC number is too short.");
    }

    if (!isValidNigerianNumber(telephone)) {
      return handleError(
        "Enter a valid Nigerian telephone number (e.g. 08012345678 or +2348012345678)."
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return handleError("Enter a valid email address.");
    }

    if (uploadedImageURLs.length === 0) {
      return handleError("Please upload product image(s).");
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    // === FORM DATA ===
    const formData = new FormData();
    formData.append("entry.1299242719", name);
    formData.append("entry.1537369659", quantity);
    formData.append("entry.39067540", costPrice);
    formData.append("entry.1239437119", retailPrice);
    formData.append("entry.182096283", city);
    formData.append("entry.1212946266", pickupLocation);
    formData.append("entry.706886514", companyName);
    formData.append("entry.758958278", nafdac);
    formData.append("entry.1928642122", telephone);
    formData.append("entry.1166237300", email);
    formData.append("entry.560447867", uploadedImageURLs.join(", "));

    // === SEND TO GOOGLE FORM ===
    fetch(form.action, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    })
      .then(() => {
        showToast("✅ Submitted successfully!");
        clearForm();
      })
      .catch(() => {
        showToast("❌ Failed to submit form.", true);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      });
  });
});
