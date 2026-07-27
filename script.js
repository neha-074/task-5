let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let currentPage = 1;

const productsPerPage = 4;

// Fetch products from JSON
fetch("products.json")
    .then(response => response.json())
    .then(data => {

        products = data;

        displayProducts(products);

    });

// Display Products
function displayProducts(productArray){

    const productGrid = document.getElementById("productGrid");

    productGrid.innerHTML = "";

    const start = (currentPage - 1) * productsPerPage;

    const end = start + productsPerPage;

    const paginatedProducts = productArray.slice(start, end);

    paginatedProducts.forEach(product => {

        productGrid.innerHTML += `

        <div class="product-card" onclick="viewProduct(${product.id})">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <div class="price">$${product.price}</div>

                <button onclick="event.stopPropagation(); addToCart(${product.id})">
                      Add to Cart
                </button> 

            </div>

        </div>

        `;

    });

    document.getElementById("pageNumber").textContent = currentPage;
}
// Search Products
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {

    const keyword = this.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(keyword)
    );

    displayProducts(filteredProducts);

});

// Category Filter
const categoryFilter = document.getElementById("categoryFilter");

categoryFilter.addEventListener("change", function () {

    const category = this.value;

    if (category === "all") {

        displayProducts(products);

    } else {

        const filteredProducts = products.filter(product =>
            product.category === category
        );

        displayProducts(filteredProducts);

    }

});

// Sort Products
const sortOption = document.getElementById("sortOption");

sortOption.addEventListener("change", function () {

    const value = this.value;

    let sortedProducts = [...products];

    if (value === "low-high") {

        sortedProducts.sort((a, b) => a.price - b.price);

    }

    else if (value === "high-low") {

        sortedProducts.sort((a, b) => b.price - a.price);

    }

    else if (value === "a-z") {

        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));

    }

    else if (value === "z-a") {

        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));

    }

    displayProducts(sortedProducts);

});

// Pagination

document.getElementById("nextBtn").addEventListener("click", () => {

    if(currentPage * productsPerPage < products.length){

        currentPage++;

        displayProducts(products);

    }

});

document.getElementById("prevBtn").addEventListener("click", () => {

    if(currentPage > 1){

        currentPage--;

        displayProducts(products);

    }

});

// Add to Cart

function addToCart(id){

    const existingProduct = cart.find(item => item.id === id);

    if(existingProduct){

        existingProduct.quantity++;

    }else{

        const product = products.find(item => item.id === id);

        cart.push({
            ...product,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert("Product added to cart!");

}
//cart count 
function updateCartCount(){

    document.getElementById("cartCount").textContent = cart.length;

}

updateCartCount();

function viewProduct(id){

    window.location.href = `product.html?id=${id}`;

}
