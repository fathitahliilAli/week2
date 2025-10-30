const products = [
  { img: "https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg", price: 2, name: "Strawberry", category: "fruits" },
  { img: "https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg", price: 3, name: "Fresh Apple", category: "fruits" },
  { img: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg", price: 1, name: "Banana", category: "fruits" },
  { img: "https://images.pexels.com/photos/51958/oranges-fruit-vitamins-healthy-eating-51958.jpeg", price: 5, name: "Lemon", category: "fruits" },
  { img: "https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg", price: 6, name: "Tomato", category: "vegetable" },
  { img: "https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg", price: 3, name: "Green Pepper", category: "vegetable" },
  { img: "https://images.pexels.com/photos/244394/pexels-photo-244394.jpeg", price: 2, name: "Purple Beet", category: "vegetable" },
  { img: "https://images.pexels.com/photos/5973583/pexels-photo-5973583.jpeg", price: 4, name: "Garlic", category: "vegetable" },
];

const productlist = document.getElementById("product-list");
const cartcount = document.querySelector(".cart-count");
const searchInput = document.getElementById("searchInput");
const categorySelector = document.getElementById("category");
const priceSelector = document.getElementById("price");

let count = 0;

// ✅ Function to display items
function filterItem(item) {
  productlist.innerHTML = "";
  if (item.length === 0) {
    productlist.innerHTML = `<p>No products found.</p>`;
    return;
  }

  item.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <div class="info">
        <p>${p.name}</p>
        <h3>$${p.price}</h3>
      </div>
      <button class="btn">Add to cart</button>
    `;

    // Add to cart button
    const addbtn = div.querySelector(".btn");
    addbtn.addEventListener("click", () => {
      count++;
      cartcount.textContent = count;
      addbtn.textContent = "Added";
      addbtn.disabled = true;
      addbtn.style.background = "#95a5a6";
    });

    productlist.appendChild(div);
  });
}

// Show all products initially
filterItem(products);

// ✅ Universal filter function (used by all three inputs)
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = categorySelector.value;
  const priceValue = parseFloat(priceSelector.value);

  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchValue)
  );

  if (categoryValue !== "All") {
    filtered = filtered.filter(p => p.category === categoryValue);
  }

  if (!isNaN(priceValue)) {
    filtered = filtered.filter(p => p.price <= priceValue);
  }

  filterItem(filtered);
}

// ✅ Listen to all filters
searchInput.addEventListener("input", applyFilters);
categorySelector.addEventListener("change", applyFilters);
priceSelector.addEventListener("input", applyFilters);
