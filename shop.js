var products = {
    'product-1' : {
        unitPrice: 10,
        title: 'T-Shirt',
        img:'img1.webp'
    },
    'product-2' : {
        unitPrice: 30,
        title: 'T-Shirt',
        img:'img2.webp'
    },
    'product-3' : {
        unitPrice: 30,
        title: 'T-Shirt',
        img:'img3.webp'
    },
    'product-4' : {
        unitPrice: 30,
        title: 'T-Shirt',
        img:'img4.webp'
    },
    'product-5' : {
        unitPrice: 30,
        title: 'T-Shirt',
        img:'img5.webp'
    },
}

var cart = {};
var cartTotal = 0;

function makeProduct(productId) {
    let productsElem = document.getElementById('products');
    let product = document.createElement('product');

    product.id = productId;
    product.className = 'product';
    product.innerHTML = 
    `<div class="product-image">
        <img src="images/${products[productId].img}" alt="${productId}-image">
    </div>
    <div class="product-details">
        <span class="title">${products[productId].title}</span>
        <span class="price">&#163;${products[productId].unitPrice}</span>
    </div>
    <div class="product-button">
        <button class="add-button" onclick="addToCart('${productId}')">Add to Cart</button>
    </div>`;

    productsElem.appendChild(product);
}


function makeCartItem(productId, quantity, total) {
    let cartContent = document.getElementById('cart-content');
    let cartItem = document.createElement('div');
    
    cartItem.id = productId;
    cartItem.className = 'cart-item';
    cartItem.innerHTML =
            `<button class="cart-remove-btn">x</button>
            <div class="cart-img">
                <img src="images/${products[productId].img}" alt="${productId}-image">
            </div>
            <div class="cart-item-title">
                ${products[productId].title}
            </div>
            <div class="cart-item-buttons">
                <input type="number" min="1" max="50" value="${quantity}">
            </div>
            <div class="cart-item-quantity">&#163;${total}</div>`;

    cartContent.appendChild(cartItem);
}

function loadProducts() {
    for (key in products) {
        makeProduct(key);
    }
}

function loadCart() {
    document.getElementById('cart-content').innerHTML = '';
    for (key in cart) {
        let total = cart[key] * products[key].unitPrice;
        makeCartItem(key, cart[key], total);
    }
}

function addToCart(productId) {
    if (!(productId in cart)) {
        cart[productId] = 1;
    } else {
        cart[productId]++;
    }
    loadCart();
}

loadProducts()
loadCart();