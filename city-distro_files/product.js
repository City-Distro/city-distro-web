const products = [
  {
    img: "./city-distro_files/68938657f19b9988001c5eaf_Ginger Shot (Ginger, Turmeric, Lime,  Lemon & Honey) 12 x 120ml (NGN 17,750).png",
    name: "Ginger Shot (Ginger, Turmeric, Lime, Lemon & Honey)",
    price: 17500,
    colorClass: "turq",
  },
  {
    img: "./city-distro_files/6893865d9ddc2471285bf5fa_Primafrit Potato Fries 2.5kg x 4 (NGN 38,000).png",
    name: "Primafrit Potato Fries",
    price: 38000,
    colorClass: "orange",
  },
  {
    img: "./city-distro_files/6893865b990e2dba4bdd9c43_Ginger Snap Cookies 36 x 60g (NGN 20,000).png",
    name: "Ginger Snap Cookies",
    price: 20000,
    colorClass: "purple",
  },
  {
    img: "./city-distro_files/6893865a9a8302e89f1dd6ac_Cinnamon Finger Cookies 36 x 60g (NGN 20,000).png",
    name: "Cinnamon Finger Cookies",
    price: 20000,
    colorClass: "turq",
  },
  {
    img: "./city-distro_files/6893865aed0c65d4545b2dd7_Leky Mills Classic Yam Chips 60pcs per pack (NGN 15,000).png.png",
    name: "Leky Mills Classic Yam Chips",
    price: 15000,
    colorClass: "dark-purlpe",
  },
  {
    img: "./city-distro_files/6893865aed0c65d4545b2dd4_Leky Mills Onion Flavoured Yam Chips 60pcs per pack (NGN 15,000).png",
    name: "Leky Mills Onion Flavoured Yam Chips",
    price: 15500,
    colorClass: "orange",
  },
  {
    img: "./city-distro_files/6893865139227837bee23cdf_Ginger Up (Ginger & Honey) 6 x 500ml (NGN 19,000).png",
    name: "Ginger Up (Ginger & Honey)",
    price: 19000,
    colorClass: "dark-purlpe",
  },
  {
    img: "./city-distro_files/689386567be4cdf3ead1841b_Belani Fresh Orange Juice 12 x 50cl (NGN 18,500).png",
    name: "Belani Fresh Orange Juice",
    price: 18500,
    colorClass: "orange",
  },
  {
    img: "./city-distro_files/68938656031cab4390a03bcd_Belani Sweetened Bottle Yoghurt 12 x 50cl (NGN 14,000).png",
    name: "Belani Sweetened Bottle Yoghurt",
    price: 14000,
    colorClass: "turq",
  },
  {
    img: "./city-distro_files/6893864f43813c15d04f6ec8_Belani Fresh Orange Juice 12 x 50cl (NGN 18,500)(1).png",
    name: "Belani Fresh Orange Juice",
    price: 18500,
    colorClass: "white",
  },
  {
    img: "./city-distro_files/689386531f9f84d8965e8367_Ginger Up (Ginger & Honey) 20 x 120ml (NGN 17,750).png",
    name: "Ginger Up (Ginger & Honey)",
    price: 17500,
    colorClass: "dark-purlpe",
  },
  {
    img: "./city-distro_files/6893865198772a4a32c7e44f_Ginger Shot (Ginger, Turmeric, Lime,  Lemon & Honey) 6 x 500ml (NGN 19,000)(1).png",
    name: "Ginger Up (Ginger & Honey)",
    price: 19000,
    colorClass: "orange",
  },
];

// Pagination function
const productsPerPage = 12;
let currentPage = 1;

const productGrid = document.getElementById("product-list-grid");
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
          <div class="product-imae_container">
            <img 
              src="${product.img}" 
              alt="${product.name}" 
              class="cc-image" />
          </div>
        </div>
      </div>
      <div class="product-desc_wrapper">
        <div class="product-title w-richtext">
          <p>${product.name}</p>
        </div>
        <div class="product-price w-richtext">
          <p>₦${product.price.toLocaleString()}</p>
        </div>
      </div>
    </div>`;

  productGrid.appendChild(card);
});
}

// your existing renderPagination() function remains unchanged
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
