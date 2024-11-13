function showSection(section , link) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.add("hidden");
    section.classList.remove("active");
  });
  document.getElementById(section).classList.add("active");

  const links = document.querySelectorAll(".navLink");
  links.forEach((link) => {
    link.classList.remove("current");
  });
  document.getElementById(link).classList.add("current");
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

class Cart {
  constructor() {
    this.items = [];
  }
//  Add func
  addItem(product){
    let existingItem = this.items.find(item => item.product.id === product.id);

    if(existingItem){
      existingItem.quantity++;
    }else{
      this.items.push({product,quantity:1});
    }
// Update cart 
/*
    updateCartView(){
      const cartSection = document.getElementById('cart');
      const itemContainer = document.createElement('dive');
      itemContainer.classList.add('cartItems');

      if(this.items.length===0){
        cartSection.innerHTML += '<p>Your cart is empty.</p>';
        cartSection.innerHTML += '<a href="#" class="btn" onclick="showSection(\'products\')">Back to Products page</a>';
        return;
      }

      // this.items.forEach(item=>{

      // });

    }*/
  }

  





}
