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

// Update cart display (both main and sticky)
function updateCart() {
  const cartList = document.getElementById("cart");
  const stickyCart = document.getElementById("stickyCart");
  cartList.innerHTML = "";
  if (stickyCart) stickyCart.innerHTML = "";

  // Update cart count in nav
  document.getElementById("cartCount").innerText = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  cartItems.forEach((item, index) => {
    // Main cart
    let li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)} 
      <button onclick="removeOne(${index})">−</button>`;
    cartList.appendChild(li);

    // Sticky cart
    if (stickyCart) {
      let stickyLi = document.createElement("li");
      stickyLi.innerHTML = `${item.name} x${item.quantity} - £${(item.price * item.quantity).toFixed(2)}
        <button onclick="removeOne(${index})">−</button>`;
      stickyCart.appendChild(stickyLi);
    }
  });

  // Update total price in main cart
  document.getElementById("total").innerText = "Total: £" + totalPrice.toFixed(2);

  // Sticky cart total
  if (stickyCart) {
    let totalP = document.createElement("p");
    totalP.innerText = "Total: £" + totalPrice.toFixed(2);
    stickyCart.appendChild(totalP);
  }
}

// Remove one item or decrease quantity
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

// Remove entire item from cart
function removeFromCart(index) {
  totalPrice -= cartItems[index].price * cartItems[index].quantity;
  cartItems.splice(index, 1);
  updateCart();
}

// Clear entire cart
function clearCart() {
  cartItems = [];
  totalPrice = 0;
  updateCart();
}

// Checkout confirmation
function checkout(event) {
  event.preventDefault();
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("✅ Order placed! Thank you, Emmanuela.");
  clearCart();
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
    section.style.display = (category === "all" || section.id === category) ? "block" : "none";
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

// Initialize sticky cart if it exists
window.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("stickyCart")) {
    const stickyCartDiv = document.createElement("div");
    stickyCartDiv.id = "stickyCart";
    stickyCartDiv.innerHTML = "<h3>Cart 🛒</h3><ul></ul>";
    document.body.appendChild(stickyCartDiv);
  }
});
