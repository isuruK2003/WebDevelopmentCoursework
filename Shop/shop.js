var products = {
    'product-1' : {
        unitPrice: 10,
        title: 'T-Shirt',
        img:'img1.webp',
        stock: 2
    },
    'product-2' : {
        unitPrice: 30,
        title: 'T-Shirt Blue',
        img:'img2.webp',
        stock: 10
    },
    'product-3' : {
        unitPrice: 30,
        title: 'T-Shirt',
        img:'img3.webp',
        stock: 30
    },
    'product-4' : {
        unitPrice: 30,
        title: 'T-Shirt',
        img:'img4.webp',
        stock: 50
    },
    'product-5' : {
        unitPrice: 30,
        title: 'T-Shirt',
        img:'img5.webp',
        stock: 19
    },
}

var cart = {};
var cartTotal = 0;

function makeProduct(productId) {
    let productsElem = document.getElementById('products');
    let product = document.createElement('div');

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
    let cartItem = document.createElement('tr');
    
    cartItem.id = productId;
    cartItem.className = 'cart-item';
    cartItem.innerHTML =
        `
        <td>
            <button class="cart-remove-btn" onclick="removeFromCart('${productId}')">&#10005;</button>
        </td>
        <td>
            <div class="cart-img">
                <img src="images/${products[productId].img}" alt="${productId}-image">
            </div>
        </td>
        <td>
            <div class="cart-item-title">
                <a href="#${productId}">${products[productId].title}</a>
            </div>
        </td>
        <td>
            <div class="cart-item-buttons">
                <button class="cart-item-increase" onclick="increaseQuantity('${productId}')">+</button>
                <span class="cart-item-quantity">${quantity}</span>
                <button class="cart-item-decrease" onclick="decreaseQuantity('${productId}')">-</button>
            </div>
        </td>
        <td>
            <div class="cart-item-total">&#163;${total}</div>
        </td>
        `;
    
    cartContent.appendChild(cartItem);
}

function loadProducts() {
    for (let key in products) {
        makeProduct(key);
    }
}

function loadCart() {
    document.getElementById('cart-content').innerHTML = '';

    if (Object.keys(cart).length == 0) {
        document.getElementById('cart-empty').style.display = 'block';
    } else {
        document.getElementById('cart-empty').style.display = 'none';
    }
    
    let cartTotal = 0;
    
    for (let key in cart) {
        let total = cart[key] * products[key].unitPrice;
        makeCartItem(key, cart[key], total);
        cartTotal += total;
    }
    
    document.getElementById('cart-total').innerHTML = cartTotal;
}

function addToCart(productId) {
    if (!(productId in cart)) {
        cart[productId] = 1;
    } else if (cart[productId] < products[productId].stock) {
        cart[productId]++;
    }
    loadCart();
}

function removeFromCart(productId) {
    delete cart[productId];
    loadCart();
}

function increaseQuantity(productId) {
    if (cart[productId] < products[productId].stock) {
        cart[productId]++;
    }
    loadCart();
}

function decreaseQuantity(productId) {
    if (cart[productId] > 1) {
        cart[productId]--;
    }
    loadCart();
}

loadProducts()
loadCart();