function openModal(postId) {
    const modal = document.getElementById('postModal');
    if (modal) {
        document.body.classList.add('modal-open');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}
function closeModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}
document.getElementById('postModal')?.addEventListener('click', function (e) {
    if (e.target === this) {
        closeModal();
    }
});


// const cart = [
//     { id: 1, name: "Chia Seeds/চিয়া সিডস Combo Pack", price: 1700, quantity: 1, image: "https://via.placeholder.com/100" },
//     { id: 2, name: "Coriander Powder / ধনিয়া গুড়া", price: 240, quantity: 2, image: "https://via.placeholder.com/100" }
//   ];

//   const cartItemsContainer = document.getElementById("cartItems");
//   const subtotalElement = document.getElementById("subtotal");

//   // Function to render cart items
//   function renderCart() {
//     cartItemsContainer.innerHTML = ""; // Clear previous items
//     let subtotal = 0;

//     cart.forEach((item, index) => {
//       subtotal += item.price * item.quantity;

//       const itemHTML = `
//         <div class="row align-items-center mb-3">
//           <div class="col-2">
//             <img src="${item.image}" alt="${item.name}" class="img-fluid">
//           </div>
//           <div class="col-6">
//             <h6 class="mb-1">${item.name}</h6>
//             <p class="mb-1"><strong>Tk ${item.price.toFixed(2)}</strong></p>
//             <button class="btn btn-link btn-sm text-danger p-0" onclick="removeItem(${index})">Remove</button>
//           </div>
//           <div class="col-4 d-flex align-items-center">
//             <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)">-</button>
//             <input type="text" value="${item.quantity}" class="form-control text-center mx-1" style="width: 50px;" readonly>
//             <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
//           </div>
//         </div>
//       `;

//       cartItemsContainer.innerHTML += itemHTML;
//     });

//     subtotalElement.textContent = `Tk ${subtotal.toFixed(2)}`;
//   }

//   // Function to update quantity
//   function updateQuantity(index, change) {
//     if (cart[index].quantity + change > 0) {
//       cart[index].quantity += change;
//       renderCart();
//     }
//   }

//   // Function to remove item
//   function removeItem(index) {
//     cart.splice(index, 1); // Remove item from cart
//     renderCart();
//   }

//   // Initial render
//   renderCart();

  