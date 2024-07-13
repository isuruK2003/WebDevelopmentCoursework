var products = [
    {
        id: 'product-1',
        unitPrice: 10,
        title: 'T-Shirt',
        img: 'img1.webp',
        stock: 2
    },
    {
        id: 'product-2',
        unitPrice: 30,
        title: 'T-Shirt Blue',
        img: 'img2.webp',
        stock: 10
    },
    {
        id: 'product-3',
        unitPrice: 30,
        title: 'T-Shirt',
        img: 'img3.webp',
        stock: 30
    },
    {
        id: 'product-4',
        unitPrice: 30,
        title: 'T-Shirt',
        img: 'img4.webp',
        stock: 50
    },
    {
        id: 'product-5',
        unitPrice: 30,
        title: 'T-Shirt',
        img: 'img5.webp',
        stock: 19
    }
];

var cart = {};

function makeProduct(productObject) {
    // Makes a single product HTML
    let productsElem = document.getElementById('products');
    let productElem = document.createElement('div');

    productElem.id = productObject.id;
    productElem.className = 'product';
    productElem.innerHTML = 
    `<div class="product-image">
        <img src="images/${productObject.img}" alt="${productObject.id}-image">
    </div>
    <div class="product-details">
        <span class="title">${productObject.title}</span>
        <span class="price">&#163;${productObject.unitPrice}</span>
    </div>
    <div class="product-button">
        <button class="add-button" onclick="addToCart('${productObject.id}')">Add to Cart</button>
    </div>`;

    productsElem.appendChild(productElem);
}


function makeCartItem(productObject, quantity, total) {
    // Makes a single cart html
    let cartContent = document.getElementById('cart-content');
    let cartItem = document.createElement('tr');
    
    cartItem.id = productObject.id;
    cartItem.className = 'cart-item';
    cartItem.innerHTML =
        `
        <td>
            <button class="cart-remove-btn" onclick="removeFromCart('${productObject.id}')">&#10005;</button>
        </td>
        <td>
            <div class="cart-img">
                <img src="images/${productObject.img}" alt="${productObject.id}-image">
            </div>
        </td>
        <td>
            <div class="cart-item-title">
                <a href="#${productObject.id}">${productObject.title}</a>
            </div>
        </td>
        <td>
            <div class="cart-item-buttons">
                <button class="cart-item-increase" onclick="increaseQuantity('${productObject.id}')">+</button>
                <span class="cart-item-quantity">${quantity}</span>
                <button class="cart-item-decrease" onclick="decreaseQuantity('${productObject.id}')">-</button>
            </div>
        </td>
        <td>
            <div class="cart-item-total">&#163;${total}</div>
        </td>
        `;
    
    cartContent.appendChild(cartItem);
}

function loadProducts() {
    // Iterates through the products array and make html for each item
    for (let i = 0; i < products.length; i++) {
        makeProduct(products[i]);
    }
}

function updateCartTotal(cartTotal) {
    let cartElems = document.getElementsByClassName('cart-total');

    for (let i = 0; i < cartElems.length; i++) {
        cartElems[0].innerHTML = cartTotal;
    }
}

function updateCartCount(cartCount) {
    // Updates the innerHTML of elements with class cart-count with
    // number of items in cart
    let cartElems = document.getElementsByClassName('cart-count');

    for (let i = 0; i < cartElems.length; i++) {
        cartElems[0].innerHTML = cartCount;
    }
}

function getProduct(productId) {
    // Returns a product object in products array
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            return products[i];
        }
    }
}

function loadCart() {
    // Loads the content of cart to elements
    document.getElementById('cart-content').innerHTML = '';

    if (Object.keys(cart).length == 0) {
        document.getElementById('cart-empty').style.display = 'block';
    } else {
        document.getElementById('cart-empty').style.display = 'none';
    }
    
    let cartTotal = 0;
    let cartCount = 0;
    
    for (let productId in cart) {
        let total = cart[productId] * getProduct(productId).unitPrice;
        makeCartItem(getProduct(productId), cart[productId], total);
        cartTotal += total;
        cartCount += cart[productId];
    }

    updateCartCount(cartCount);
    updateCartTotal(cartTotal);
}

function addToCart(productId) {
    // Adds a product object to cart dictionary
    if (!(productId in cart)) {
        cart[productId] = 1;
    } else if (cart[productId] < getProduct(productId).stock) {
        cart[productId]++;
    }
    loadCart();
}

function removeFromCart(productId) {
    // Removes a product object from cart dictionary
    delete cart[productId];
    loadCart();
}

function increaseQuantity(productId) {
    // Increase the value of a object in cart
    // if and only if, value of bject is less than stock value
    if (cart[productId] < getProduct(productId).stock) {
        cart[productId]++;
    }
    loadCart();
}

function decreaseQuantity(productId) {
    // Decreases the value of a object in cart
    // if and only if, value of bject is greter than 1
    // (avoids 0 and negatives in cart)
    if (cart[productId] > 1) {
        cart[productId]--;
    }
    loadCart();
}

loadProducts()
loadCart();