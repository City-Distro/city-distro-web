// THIS HELPS TO LOAD OUR IMAGES BEFORE THEY ARE DISPLAYED
function preloadImages(images, callback) {
  let loaded = 0;
  const total = images.length;

  if (total === 0) {
    callback(); 
    return;
  }

  images.forEach((src) => {
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded === total) {
        callback();
      }
    };
    img.src = src;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const imageElements = document.querySelectorAll("img");
  const imageSources = Array.from(imageElements)
    .map((img) => img.getAttribute("src"))
    .filter(Boolean);

  preloadImages(imageSources, () => {
    document.body.classList.add("images-loaded");
  });
});
