var products = [
    {
        id: 'product-1',
        unitPrice: 5,
        title: 'Sticker Pack',
        img: 'productImages/product_1.jpg',
        stock: 2
    },
    {
        id: 'product-2',
        unitPrice: 30,
        title: 'Natural Lip Balm',
        img: 'productImages/product_2.jpg',
        stock: 10
    },
    {
        id: 'product-3',
        unitPrice: 30,
        title: 'Bio Degradable Cups and Spoon Pack',
        img: 'productImages/product_3.jpg',
        stock: 30
    },
    {
        id: 'product-4',
        unitPrice: 30,
        title: 'Natural Cotton Stuff Animal',
        img: 'productImages/product_4.jpg',
        stock: 50
    },
    {
        id: 'product-5',
        unitPrice: 5,
        title: 'Eco-friendly Soap',
        img: 'productImages/product_5.jpg',
        stock: 19
    },
    {
        id: 'product-6',
        unitPrice: 30,
        title: 'Eco-friendly Bottle (Made with Biodegradable Plastic)',
        img: 'productImages/product_6.jpg',
        stock: 19
    },
    {
        id: 'product-7',
        unitPrice: 5,
        title: 'Paper Straw Pack',
        img: 'productImages/product_7.jpg',
        stock: 19
    },
    {
        id: 'product-8',
        unitPrice: 30,
        title: 'Natural Cotton T-Shirt (Lime Green Colour)',
        img: 'productImages/product_8.jpg',
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
        <img src="${productObject.img}" alt="${productObject.id}-image">
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
        <td class="cart-img">
            <img src="${productObject.img}" alt="${productObject.id}-image">
        </td>
        <td class="cart-item-title">
            <a href="#${productObject.id}">${productObject.title}</a>
        </td>
        <td>
            <div class="cart-item-buttons">
                <button class="cart-item-increase" onclick="increaseQuantity('${productObject.id}')">+</button>
                <span class="cart-item-quantity">${quantity}</span>
                <button class="cart-item-decrease" onclick="decreaseQuantity('${productObject.id}')">-</button>
            </div>
        </td>
        <td class="cart-item-total">
            &#163;${total}
        </td>
        `;
    
    cartContent.appendChild(cartItem);
}

function loadProducts() {
    // Iterates through the products array and make html for each item
    document.getElementById('products').innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        makeProduct(products[i]);
    }
}

function updateCartTotal(cartTotal) {
    let cartElems = document.getElementsByClassName('cart-total');
    let cartTotalInput = document.getElementsByName('cart-total')[0];

    for (let i = 0; i < cartElems.length; i++) {
        cartElems[i].innerHTML = cartTotal;
        cartTotalInput.value = cartTotal;
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

function sortProducts() {
    let key = document.getElementById('sort-by').value;

    products.sort(function(a, b) {
        let item1 = a[key];
        let item2 = b[key];

        if (key === 'title') {
            item1 = item1.toLowerCase();
            item2 = item2.toLowerCase();
        }

        if (item1 > item2) {
            return 1;
        } else if (item1 < item2) {
            return -1;
        } else {
            return 0;
        }
    });

    loadProducts();
}


sortProducts(); //  this also loads the products
loadCart();