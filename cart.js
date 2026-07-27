let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

displayCart();

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<h2>Your cart is empty.</h2>";

        totalPrice.textContent = "0.00";

        return;

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="product-card">

            <img src="${item.image}" alt="${item.name}">

            <div class="product-info">

                <h3>${item.name}</h3>

                <p>${item.category}</p>

                <div class="price">$${item.price}</div>

                <p><strong>Quantity:</strong> ${item.quantity}</p>

                <div style="display:flex; gap:10px; margin-top:15px;">

                    <button onclick="decreaseQuantity(${index})">
                        -
                    </button>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                    <button onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

            </div>

        </div>

        `;

    });

    totalPrice.textContent = total.toFixed(2);

}

function increaseQuantity(index){

    cart[index].quantity++;

    saveCart();

}

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    saveCart();

}

function removeItem(index){

    cart.splice(index,1);

    saveCart();

}

function saveCart(){

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}
