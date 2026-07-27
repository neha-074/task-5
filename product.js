// Get Product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));

// Fetch Products
fetch("products.json")
    .then(response => response.json())
    .then(products => {

        const product = products.find(item => item.id === productId);

        if (!product) {
            document.getElementById("productDetails").innerHTML =
                "<h2>Product not found.</h2>";
            return;
        }

        displayProduct(product);

    });

// Display Product
function displayProduct(product) {

    document.getElementById("productDetails").innerHTML = `

        <div class="product-card" style="max-width:900px; margin:auto;">

            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h2>${product.name}</h2>

                <p><strong>Category:</strong> ${product.category}</p>

                <h3 class="price">$${product.price}</h3>

                <p>
                    This is a premium quality product from the
                    ${product.category} category.
                    It is designed with modern standards and offers
                    excellent value for money.
                </p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        </div>

    `;
}

// Add to Cart
function addToCart(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    fetch("products.json")
        .then(response => response.json())
        .then(products => {

            const existingProduct = cart.find(item => item.id === id);

            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                const product = products.find(item => item.id === id);

                cart.push({
                    ...product,
                    quantity: 1
                });

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert("Product added to cart!");

        });

}
