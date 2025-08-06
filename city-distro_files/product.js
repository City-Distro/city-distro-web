const products = [
  {
    name: "Belani yoghurt fewfewfwefwefwefwefew",
    price: 18500,
    img: "./city-distro_files/product-images/Belani Fresh Orange Juice 12 x 50cl (NGN 18,500).png",
    colorClass: "turq",
  },
  {
    name: "Belani orange juice pack",
    price: 7000,
    img: "./city-distro_files/product-images/belani orange juice pack.png",
    colorClass: "orange",
  },
  {
    name: "Prima frit french fries",
    price: 1500,
    img: "./city-distro_files/product-images/prima frit french fries.png",
    colorClass: "purple",
  },
  {
    name: "Ginger shot pack",
    price: 3500,
    img: "./city-distro_files/product-images/ginger shot pack.png",
    colorClass: "white",
  },
  {
    name: "Liz’s ginger snap cookie",
    price: 800,
    img: "./city-distro_files/product-images/liz's ginger snap cookise.png",
    colorClass: "dark-purlpe",
  },
  {
    name: "Belani sweetened yoghurt pack",
    price: 4500,
    img: "./city-distro_files/product-images/belani sweetened yoghurt pack.png",
    colorClass: "orange",
  },
  {
    name: "Prima frit french fries",
    price: 1500,
    img: "./city-distro_files/product-images/prima frit french fries.png",
    colorClass: "dark-purlpe",
  },
  {
    name: "Ginger up pack",
    price: 3500,
    img: "./city-distro_files/product-images/ginger pack up.png",
    colorClass: "orange",
  },
  {
    name: "Belani yoghurt banana",
    price: 3500,
    img: "./city-distro_files/product-images/belani yoghurt banana.png",
    colorClass: "turq",
  },
  {
    name: "Liz’s cinnamon finger cookie",
    price: 800,
    img: "./city-distro_files/product-images/liz's cinnamon finger cookise.png",
    colorClass: "white",
  },
  {
    name: "Belani yoghurt plain",
    price: 3500,
    img: "./city-distro_files/product-images/belani yoghurt plain.png",
    colorClass: "dark-purlpe",
  },
  {
    name: "Ginger up pack",
    price: 3500,
    img: "./city-distro_files/product-images/ginger pack up.png",
    colorClass: "orange",
  },

  // INITIAL  PRODUCTS
];

// Pagination function
const productsPerPage = 12;
let currentPage = 1;

const productGrid = document.getElementById("product-grid");
const pagination = document.getElementById("pagination");

function renderProducts(page) {
  productGrid.innerHTML = "";
  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const visibleProducts = products.slice(start, end);

  visibleProducts.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card_block";
    card.innerHTML = `
        <div class="product-card">
          <div class="product-img_wrapper">
            <div class="product-img ${product.colorClass}">
              <img src="${product.img}" loading="lazy" alt="${product.name}" class="cc-image">
            </div>
          </div>
          <div class="product-desc_wrapper">
            <div class="product-title w-richtext">
              <p>${product.name}</p>
            </div>
            <div class="product-price w-richtext">
              <p>₦${product.price}</p>
            </div>
          </div>
        </div>
      `;
    productGrid.appendChild(card);
  });
}

function renderPagination() {
  pagination.innerHTML = "";
  const pageCount = Math.ceil(products.length / productsPerPage);

  const createPageButton = (pageNum, isActive = false) => {
    const btn = document.createElement("div");
    btn.className = `pagination-num${isActive ? " rounded" : ""}`;
    btn.innerHTML = `<div>${pageNum}</div>`;
    btn.addEventListener("click", () => {
      currentPage = pageNum;
      renderProducts(currentPage);
      renderPagination();
    });
    return btn;
  };

  const addEllipsis = () => {
    const ellipsis = document.createElement("div");
    ellipsis.className = "pagination-num";
    ellipsis.innerHTML = `<div>...</div>`;
    pagination.appendChild(ellipsis);
  };

  if (pageCount <= 4) {
    for (let i = 1; i <= pageCount; i++) {
      pagination.appendChild(createPageButton(i, i === currentPage));
    }
  } else {
    // If more than 4 pages, show smarter logic with ellipsis
    if (currentPage <= 2) {
      for (let i = 1; i <= 3; i++) {
        pagination.appendChild(createPageButton(i, i === currentPage));
      }
      addEllipsis();
      pagination.appendChild(createPageButton(pageCount));
    } else if (currentPage >= pageCount - 1) {
      pagination.appendChild(createPageButton(1));
      addEllipsis();
      for (let i = pageCount - 2; i <= pageCount; i++) {
        pagination.appendChild(createPageButton(i, i === currentPage));
      }
    } else {
      pagination.appendChild(createPageButton(1));
      addEllipsis();
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pagination.appendChild(createPageButton(i, i === currentPage));
      }
      addEllipsis();
      pagination.appendChild(createPageButton(pageCount));
    }
  }

  // Optionally add "Next"
  if (currentPage < pageCount) {
    const nextBtn = document.createElement("div");
    nextBtn.className = "pagination-num next";
    nextBtn.innerHTML = "<div>Next</div>";
    nextBtn.addEventListener("click", () => {
      currentPage++;
      renderProducts(currentPage);
      renderPagination();
    });
    pagination.appendChild(nextBtn);
  }
}

// Initial load
renderProducts(currentPage);
renderPagination();