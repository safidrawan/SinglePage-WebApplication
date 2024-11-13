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
  document.getElementById("sym").remove();
  document.getElementById(link).classList.add("current");
  document.getElementById(link).innerHTML += symb;
}

function sendMessage() {
  let email = document.getElementById("email");
  let name = document.getElementById("name");
  let message = document.getElementById("message");
  let alert = document.getElementById("alert");

  alert.innerHTML = `Thank you, we will get back to soon throught ${email.value}`;
  alert.style.display = "block";
  setTimeout(() => {
    alert.style.display = "none";
    email.value = "";
    name.value = "";
    message.value = "";
  }, 3000);
}

class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

// Cart section style

class Cart {
  constructor() {
    this.items = [];
  }
  //  Add product to cart func
  addItem(product) {
    let existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    this.updateCartView();
  }

  // Update cart func
  updateCartView() {
    const cartSection = document.getElementById("cart");
    const itemContainer = document.createElement("dive");
    itemContainer.classList.add("cartItems");

    cartSection.innerHTML = "<h1>Cart</h1>";

    if (this.items.length === 0) {
      cartSection.innerHTML += "<p>Your cart is empty.</p>";
      cartSection.innerHTML +=
        '<a href="#" class="btn" onclick="showSection(\'products\')">Back to Products page</a>';
      return;
    }

    this.items.forEach((item) => {
      let cartItem = document.createElement("div");
      cartItem.classList.add("cartItem");
      cartItem.innerHTML = ` 
                <img src="${item.product.image}" >
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
      cartSection.appendChild(cartItem);
    });
    let total = document.createElement("div");
    total.classList.add("total");
    total.innerHTML = `
      <h2> Total: $${this.calcTotal()}</h2>
      <button class="btn checkout-btn">Proceed to Checkout</button>
      <a href="#" class="btn" onclick="showSection('products')">Continue Shopping</a>
    `;
    cartSection.appendChild(total);
  }
  calcTotal() {
    return this.items.reduce((total,item)=>total + (item.product.price * item.quantity),0).toFixed(2);
    
  }
  removeItem(id) {
    this.items = this.items.filter(item => item.product.id != id);
    this.updateCartView();
  }

  updateQuantity(productId, quantity) {
    const cartItem = this.items.find(item => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity = quantity;
        this.updateCartView();
    }
}


} // cart class closing
const cart = new Cart();

function setupProductEventListeners() {
  const productCarts = document.querySelectorAll('.product-cart');
  
  productCarts.forEach(productCart => {
      const addToCartBtn = productCart.querySelector('.btn');
      
      addToCartBtn.addEventListener('click', () => {
          const name = productCart.querySelector('h3').textContent;
          const price = parseFloat(productCart.querySelector('.price').textContent);
          const image = productCart.querySelector('img').src;
          
          const product = new Product(
              name.replace(/\s+/g, '-').toLowerCase(), 
              name, 
              price, 
              image
          );
          
          cart.addItem(product);
          showSection('cart');
      });
  });
}

