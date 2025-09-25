let cartItems = [];
let totalPrice = 0;

// Add to cart with quantity tracking
function addToCart(name, price) {
  let existing = cartItems.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({ name, price, quantity: 1 });
  }
  totalPrice += price;
  updateCart();
}

// Update cart display
function updateCart() {
  let cartList = document.getElementById("cart");
  cartList.innerHTML = "";

document.getElementById("cartCount").innerText = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  cartItems.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)} 
  <button onclick="removeOne(${index})">−</button>`;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText = "Total: £" + totalPrice.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
  totalPrice -= cartItems[index].price * cartItems[index].quantity;
  cartItems.splice(index, 1);
  updateCart();
}

function clearCart() {
  cartItems = [];
  totalPrice = 0;
  updateCart();
}


function removeOne(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
    totalPrice -= cartItems[index].price;
  } else {
    totalPrice -= cartItems[index].price;
    cartItems.splice(index, 1);
  }
  updateCart();
}

// Checkout confirmation
function checkout(event) {
  event.preventDefault();
  alert("✅ Order placed! Thank you, Emmanuela.");
  cartItems = [];
  totalPrice = 0;
  updateCart();
}

// Product search filter
function filterProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const name = product.querySelector("h3").innerText.toLowerCase();
    product.style.display = name.includes(input) ? "block" : "none";
  });
}

// Category filter buttons
function showCategory(category) {
  const sections = document.querySelectorAll(".category");
  sections.forEach(section => {
    if (category === "all" || section.id === category) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

// Dropdown sorting
function sortProducts() {
  const value = document.getElementById("sortSelect").value;
  const allGrids = document.querySelectorAll(".product-grid");

  allGrids.forEach(grid => {
    let products = Array.from(grid.children);

    products.sort((a, b) => {
      const nameA = a.querySelector("h3").innerText;
      const nameB = b.querySelector("h3").innerText;
      const priceA = parseFloat(a.querySelector("p").innerText.replace("£", ""));
      const priceB = parseFloat(b.querySelector("p").innerText.replace("£", ""));

      if (value === "name") return nameA.localeCompare(nameB);
      if (value === "priceLow") return priceA - priceB;
      if (value === "priceHigh") return priceB - priceA;
      return 0;
    });

    products.forEach(p => grid.appendChild(p));
  });
}
