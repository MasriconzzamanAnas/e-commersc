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
});
