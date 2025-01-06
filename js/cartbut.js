// Sample cart data
/*const cart = [
    { id: 1, name: "Coriander Powder / ধনিয়া গুড়া", price: 240, quantity: 1, description: "500 গ্রাম", image: "https://via.placeholder.com/100" },
    { id: 2, name: "Turmeric Powder / হলুদ গুড়া", price: 150, quantity: 1, description: "200 গ্রাম", image: "https://via.placeholder.com/100" }
  ];* */

  

  // Function to render cart items
  function renderCart() {
    cartItemsContainer.innerHTML = ""; // Clear previous items
    let subtotal = 0;

    cart.forEach((item, index) => {
      subtotal += item.price * item.quantity;
      const itemHTML = `
        <div class="col-md-8">
          <div class="card mb-3">
            <div class="row g-0">
              <div class="col-md-3">
                <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">${item.description}</p>
                  <p class="card-text"><strong>Price: Tk ${item.price}</strong></p>
                  <p class="card-text">
                    Quantity:
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="text" value="${item.quantity}" class="form-control d-inline w-25 text-center" readonly>
                    <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
                  </p>
                  <a href="#" class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      cartItemsContainer.innerHTML += itemHTML;
    });

    subtotalElement.textContent = `Tk ${subtotal.toFixed(2)}`;
  }

  // Function to update quantity
  function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
      cart[index].quantity += change;
      renderCart();
    }
  }

  // Function to remove item
  function removeItem(index) {
    cart.splice(index, 1); // Remove item from cart
    renderCart();
  }

  // Initial render
  renderCart();