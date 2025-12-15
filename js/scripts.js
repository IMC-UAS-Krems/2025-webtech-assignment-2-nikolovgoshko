let products = [
    { id: 1, name: "Teddy Bear", price: 15, img: "img/teddy.jpg" },
    { id: 2, name: "Winter Jacket", price: 50, img: "img/jacket.jpg" },
    { id: 3, name: "LEGO Set", price: 24, img: "img/lego.jpg" },
    { id: 4, name: "Christmas Tree", price: 50, img: "img/tree.jpg" },
    { id: 5, name: "Board Game", price: 8, img: "img/boardgame.jpg" },
    { id: 6, name: "Warm Scarf", price: 15, img: "img/scarf.jpg" },
    { id: 7, name: "Snow Boots", price: 40, img: "img/boots.jpg" },
    { id: 8, name: "Art Supplies", price: 9, img: "img/art.jpg" },
    { id: 9, name: "Doll", price: 6, img: "img/doll.jpg" },
    { id: 10, name: "Ornaments Box", price: 20, img: "img/ornaments.jpg" },
    { id: 11, name: "Wool Gloves", price: 10, img: "img/gloves.jpg" },
    { id: 12, name: "Fairy Lights", price: 15, img: "img/lights.jpg" },
    { id: 13, name: "Story Book", price: 4, img: "img/book.jpg" },
    { id: 14, name: "Toy Truck", price: 8, img: "img/truck.jpg" },
    { id: 15, name: "Santa Hat", price: 5, img: "img/hat.jpg" },
    { id: 16, name: "Chocolate Box", price: 5, img: "img/chocolate.jpg" }
];

let cart = [];

window.onload = function () {
    loadProducts();
};

function showNotification(message) {
    const toastBody = document.getElementById('toast-message');
    toastBody.innerText = message;
    const toastEl = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

function loadProducts() {
    let container = document.getElementById("product-list");
    let html = "";

    for (let i = 0; i < products.length; i++) {
        let p = products[i];
        html += `
            <div class="col-md-3 col-sm-6">
                <div class="card h-100 rounded-0 border-0 shadow-sm">
                    <img src="${p.img}" class="card-img-top" alt="${p.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${p.name}</h5>
                        <p class="price-text">€${p.price.toFixed(2)}</p>
                        <button class="btn btn-outline-custom-green mt-auto w-100" onclick="addToCart(${p.id})">Add to Basket</button>
                    </div>
                </div>
            </div>
        `;
    }
    container.innerHTML = html;
}

function addToCart(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            cart.push(products[i]);
            showNotification(products[i].name + " added to basket.");
            document.getElementById("cart-count").innerText = cart.length;
        }
    }
}

function showShop() {
    document.getElementById("shop-section").style.display = "block";
    document.getElementById("checkout-section").style.display = "none";
    document.getElementById("confirmation-section").style.display = "none";
    window.scrollTo(0, 0);
}

function goToCheckout() {
    if (cart.length === 0) {
        showNotification("Your basket is empty. Please choose a gift.");
        return;
    }

    document.getElementById("shop-section").style.display = "none";
    document.getElementById("checkout-section").style.display = "block";

    let list = document.getElementById("cart-summary");
    let html = "";
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        html += `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${cart[i].name}</h6>
                </div>
                <span class="text-muted">€${cart[i].price.toFixed(2)}</span>
            </li>
        `;
        total += cart[i].price;
    }

    html += `
        <li class="list-group-item d-flex justify-content-between fw-bold text-custom-green">
            <span>Subtotal</span>
            <span>€${total.toFixed(2)}</span>
        </li>
    `;

    list.innerHTML = html;
    document.getElementById("checkout-badge").innerText = cart.length;
    window.scrollTo(0, 0);
}

function processOrder() {
    let first = document.getElementById("firstName").value;
    let last = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let address = document.getElementById("address").value;
    let country = document.getElementById("country").value;
    let zip = document.getElementById("zip").value;
    let phone = document.getElementById("phone").value;

    if (first === "" || last === "" || email === "" || address === "" || country === "" || zip === "") {
        showNotification("Please fill in all required fields.");
        return;
    }

    if (!email.includes("@")) {
        showNotification("Please enter a valid email address containing '@'.");
        return;
    }

    if (zip.length !== 4 || isNaN(zip)) {
        showNotification("Austrian Zip Code must be exactly 4 numbers.");
        return;
    }

    if (isNaN(phone) || phone === "") {
        showNotification("Phone number must contain numbers only.");
        return;
    }

    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price;
    }

    let discountRate = 0;
    if (cart.length >= 3) {
        discountRate = 0.10;
    }

    let discount = subtotal * discountRate;
    let total = subtotal - discount;

    document.getElementById("checkout-section").style.display = "none";
    document.getElementById("confirmation-section").style.display = "block";

    document.getElementById("conf-name").innerText = first;
    document.getElementById("conf-total-paid").innerText = "€" + total.toFixed(2);

    let receiptHtml = "";
    receiptHtml += `<li class="list-group-item d-flex justify-content-between"><span>Subtotal:</span> <span>€${subtotal.toFixed(2)}</span></li>`;

    if (discount > 0) {
        receiptHtml += `<li class="list-group-item d-flex justify-content-between text-danger"><span>Discount (10%):</span> <span>-€${discount.toFixed(2)}</span></li>`;
    } else {
        receiptHtml += `<li class="list-group-item d-flex justify-content-between text-muted"><span>Discount (0%):</span> <span>-€0.00</span></li>`;
    }

    document.getElementById("receipt-list").innerHTML = receiptHtml;
    window.scrollTo(0, 0);
}