// catagory section
// fetch(
//     `https://dummyjson.com/products/categories`
// ).then(response =>response.json())
// .then(data =>{
//     console.log(data);
//     try{
//         const categoieslist = document.getElementById("catbutton")
//         data.forEach(item => {
//             categoieslist.innerHTML += (
//                 `<button class="px-4 py-2 rounded-xl bg-purple-600 text-white shadow-lg shadow-purple-200 transition-all text-sm sm:text-base whitespace-nowrap">${item.name}</button>`                 
//             )
//         });
//     }
//     catch(error){
//         console.log( error);
//     }
// })
/** 

fetch(`https://dummyjson.com/products`)
  .then(response => response.json())
  .then(data => {
    try {
      const productslist = document.getElementById("productList");
      productslist.innerHTML = ""; // Clear existing products before adding new ones
      data.products.forEach(item => {
        productslist.innerHTML += `
          <div class="col col-md-4 col-sm-6 col-lg-3 mb-4">
            <div class="card">
              <img src="${item.thumbnail}" class="card-img-top" alt="Product Image"/>
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">
                  <strong>Description:</strong> ${item.description}
                </p>
                <p class="text-primary fw-bold">$${item.price}</p>
                <p><strong>Rating:</strong> ⭐⭐⭐⭐ (${item.rating})</p>
                <p><strong>Stock:</strong> ${item.stock} available</p>
                <p><strong>Brand:</strong> ${item.brand}</p>
                <div class="d-flex justify-content-between">
                  <button class="btn btn-primary btn-sm" onclick="openModal(${item.id})">Add to Cart</button>
                  <button class="btn btn-outline-secondary btn-sm">About</button>
                </div>
              </div>
            </div>
          </div>`;
      });
    } catch (error) {
      console.error("Error loading products:", error);
    }
  });
*/
  // Initialize an empty cart array
let cart = [];

// Fetch and display products
fetch(`https://dummyjson.com/products`)
  .then((response) => response.json())
  .then((data) => {
    try {
      const productslist = document.getElementById("productList");
      productslist.innerHTML = ""; // Clear existing products
      data.products.forEach((item) => {
        productslist.innerHTML += `
          <div class="col col-md-4 col-sm-6 col-lg-3 mb-4">
            <div class="card">
              <img src="${item.thumbnail}" class="card-img-top" alt="Product Image"/>
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text"><strong>Description:</strong> ${item.description}</p>
                <p class="text-primary fw-bold">$${item.price}</p>
                <p><strong>Stock:</strong> ${item.stock} available</p>
                <div class="d-flex justify-content-between">
                  <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id}, '${item.title}', ${item.price}, '${item.thumbnail}')">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>`;
      });
    } catch (error) {
      console.error("Error loading products:", error);
    }
  })
  .catch((error) => console.error("Error fetching products:", error));

// Add product to the cart
function addToCart(id, title, price, thumbnail) {
  // Check if the product already exists in the cart
  const existingProduct = cart.find((item) => item.id === id);
  if (existingProduct) {
    // Increment quantity if the product already exists
    existingProduct.quantity += 1;
  } else {
    // Add new product to the cart
    cart.push({ id, title, price, thumbnail, quantity: 1 });
  }

  // Update the cart UI
  updateCartUI();

  // Open the cart modal
  openModal();
}


const subtotalElement = document.getElementById("subtotal");
// Update the cart sidebar
function updateCartUI() {
  const cartItemsContainer = document.getElementById("cartItems");

  // Check if elements exist
  if (!cartItemsContainer || !subtotalElement) {
    console.error("Cart elements not found!");
    return;
  }

  // Clear previous cart details
  cartItemsContainer.innerHTML = "";

  // Populate cart with items
  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.price * item.quantity; // Calculate subtotal
    cartItemsContainer.innerHTML += `
      <div class="d-flex align-items-center border-bottom pb-2 mb-2">
        <img src="${item.thumbnail}" alt="${item.title}" class="w-25 me-3">
        <div class="flex-grow-1">
          <h5 class="mb-1">${item.title}</h5>
          <p class="mb-0">$${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}</p>
          <div class="d-flex align-items-center mt-2">
            <button class="btn btn-sm btn-outline-secondary me-2" onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button class="btn btn-sm btn-outline-secondary ms-2" onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
        </div>
        <button class="btn btn-sm btn-danger ms-3" onclick="removeFromCart(${item.id})">Remove</button>
      </div>`;
  });

  // Update subtotal 
  subtotalElement.textContent = `${subtotal.toFixed(2)}`;
  
}

function applyPromocode() {
  const promoCodeInput = document.getElementById("promocode").value;
  const promoCode = "ostad10";
  const promocode = "ostad5"
  
  //const userPaymentElement = document.getElementById("user-payment");
  const totalPrice = parseInt(subtotalElement.textContent);

  if (promoCodeInput === promocode) {
    const discountedPrice = totalPrice - totalPrice * 0.05; // 10% discount
    subtotalElement.textContent = discountedPrice.toFixed(2); // Update total price
    //userPaymentElement.textContent = discountedPrice.toFixed(2);  Update user payment
    //alert("Promo code applied successfully!");
  } else if(promoCodeInput === promoCode) {
    const discountedPrice = totalPrice - totalPrice * 0.10; // 5% discount
    subtotalElement.textContent = discountedPrice.toFixed(2); // Update total price
    //userPaymentElement.textContent = discountedPrice.toFixed(2);  Update user payment
    //alert("Promo code applied successfully!");
    
  } else {
    alert("Invalid promo code.");
  }
}  

/** */

// Update product quantity
function updateQuantity(id, change) {
  const product = cart.find((item) => item.id === id);
  if (product) {
    product.quantity += change;

    // Remove product if quantity is zero or less
    if (product.quantity <= 0) {
      cart = cart.filter((item) => item.id !== id);
    }
  }

  // Update the cart UI
  updateCartUI();
}

// Remove product from the cart
function removeFromCart(id) {
  // Remove product by filtering it out of the cart array
  cart = cart.filter((item) => item.id !== id);

  // Update the cart UI
  updateCartUI();
}

// Open the cart modal
function openModal() {
  const modal = document.getElementById("postModal");
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  } else {
    console.error("Cart modal not found!");
  }
}

// Close the cart modal
function closeModal() {
  const modal = document.getElementById("postModal");
  if (modal) {
    modal.classList.remove("flex");
    modal.classList.add("hidden");
  }
}

// Close modal when clicking outside
document.getElementById("postModal")?.addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});




/** // Close modal when clicking outside
document.getElementById("postModal")?.addEventListener("click", function (e) {
  if (e.target === this) {
    closeModal();
  }
});

 // Function to open modal and load product details
function openModal(postId) {
  const modal = document.getElementById('postModal');
  if (modal) {
    document.body.classList.add('modal-open');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    fetch(`https://dummyjson.com/products/${postId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const cartItemsContainer = document.getElementById("cartItems");
        const subtotalElement = document.getElementById("subtotal");

        // Populate the modal with product details
        cartItemsContainer.innerHTML = `
          <div class="p-6">
            <img class="w-full h-64 object-cover rounded-lg mb-6" src="${data.thumbnail}" alt="${data.title}">
            <div>
              <h5 class="text-xl font-bold">${data.title}</h5>
              <p class="text-gray-700 mb-4"><strong>Price:</strong> $${data.price}</p>
              <p class="text-gray-700"><strong>Description:</strong> ${data.description}</p>
            </div>
          </div>`;

        // Update subtotal
        subtotalElement.textContent = `$${data.price}`;
      })
      .catch(error => console.error("Error loading product details:", error));
  }
}

// Function to close modal
function closeModal() {
  const modal = document.getElementById('postModal');
  if (modal) {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

// Close modal when clicking outside
document.getElementById('postModal')?.addEventListener('click', function (e) {
  if (e.target === this) {
    closeModal();
  }
});*/
