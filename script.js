function showSection(section, link) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.add("hidden");
    section.classList.remove("active");
  });
  document.getElementById(section).classList.add("active");

  let symb = '<span id="sym"><span>^</span></span>';
  const links = document.querySelectorAll(".navLink");
  links.forEach((link) => {
    link.classList.remove("current");
  });

  const symElement = document.getElementById("sym");
  if (symElement) {
    symElement.remove();
  }

  document.getElementById(link).classList.add("current");
  document.getElementById(link).innerHTML += symb;

  if (section === "cart") {
    cart.updateCartView();
  }
}

function sendMessage() {
  let email = document.getElementById("email");
  let name = document.getElementById("name");
  let message = document.getElementById("message");
  let alert = document.getElementById("alert");

  let countdownTime = 5;

  alert.innerHTML = `Thank you, we will get back to you soon through: ${email.value}. <br><br> This message will disappear in ${countdownTime} seconds.`;
  alert.style.display = "block";

  const countdown = setInterval(() => {
    countdownTime--;
    alert.innerHTML = `Thank you, we will get back to you soon through: ${email.value}. <br><br> This message will disappear in ${countdownTime} seconds.`;

    if (countdownTime <= 0) {
      clearInterval(countdown);
      alert.style.display = "none";
      email.value = "";
      name.value = "";
      message.value = "";
    }
  }, 1000);
}
class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

class Cart {
  constructor() {
    this.items = [];
  }

  addItem(product) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }

    this.updateCartView();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.updateCartView();
  }
  checkout(){
    this.items = [];
    alert('Thank you for your purchase.');
    this.updateCartView();
  }
  updateQuantity(productId, quantity) {
    const cartItem = this.items.find((item) => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity = Math.max(0, quantity); 
      this.updateCartView();
    }
  }

  calculateTotal() {
    return this.items
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  }

  updateCartView() {
    const cartSection = document.getElementById("cart");
    cartSection.innerHTML = "<h1>Cart</h1>";

    const totalCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const cartCounter = document.getElementById("cartCounter");
    if (cartCounter) {
        cartCounter.textContent = totalCount; 
    }

    if (this.items.length === 0) {
      cartSection.innerHTML += "<p>Your cart is empty.</p>";
      cartSection.innerHTML +=
        '<a href="#" class="btn" onclick="showSection(\'products\' ,\'proLink\')">Back to Products page</a>';
      return;
    }

    this.items.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
              <img src="${item.product.image}" alt="${item.product.name}">
              <div class="cart-item-details">
                  <h3>${item.product.name}</h3>
                  <p>Price: $${item.product.price}</p>
                  <div class="quantity-control">
                      <button onclick="cart.updateQuantity('${
                        item.product.id
                      }', ${item.quantity - 1})">-</button>
                      <span>${item.quantity}</span>
                      <button onclick="cart.updateQuantity('${
                        item.product.id
                      }', ${item.quantity + 1})">+</button>
                  </div>
                  <button onclick="cart.removeItem('${
                    item.product.id
                  }')">Remove</button>
              </div>
          `;
      cartSection.appendChild(cartItemElement);
    });

    const totalElement = document.createElement("div");
    totalElement.classList.add("cart-total");
    totalElement.innerHTML = `
          <h2>Total: $${this.calculateTotal()}</h2>
          <button class="btn checkout-btn" onclick="cart.checkout()">Proceed to Checkout</button>
          <a href="#" class="btn" onclick="showSection('products','proLink')">Continue Shopping</a>
          
      `;
    cartSection.appendChild(totalElement);
}
}
const cart = new Cart();

function setupProductEventListeners() {
  const productCarts = document.querySelectorAll(".product-cart");

  productCarts.forEach((productCart) => {
    const addToCartBtn = productCart.querySelector(".btn");

    addToCartBtn.addEventListener("click", () => {
      const name = productCart.querySelector("h3").textContent;
      const price = parseFloat(productCart.querySelector(".price").textContent);
      const image = productCart.querySelector("img").src;

      const product = new Product(
        name.replace(/\s+/g, "-").toLowerCase(),
        name,
        price,
        image
      );

      cart.addItem(product);
      showSection("cart", "cartLink");
    });
  });

  const images = document.querySelectorAll('#gallery img');
  
  images.forEach(image => {
    image.addEventListener('click', () => {
      showSection('products','proLink');
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {
  setupProductEventListeners();
});
