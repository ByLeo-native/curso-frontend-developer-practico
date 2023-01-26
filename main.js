const menuEmail = document.querySelector(".navbar-email");
const desktopMenu = document.querySelector(".desktop-menu");

const burguerIcon = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");

const navbarShoppingCart = document.querySelector(".navbar-shopping-cart");
const shoppingCardContainer = document.querySelector("#shoppingCardContainer");

const productDetailContainer = document.querySelector("#product-detail");
const productDetailCloseIcon = document.querySelector(".product-detail-close");

const slidingElements = [ desktopMenu, mobileMenu, shoppingCardContainer, productDetailContainer ];


const cardsContainer = document.querySelector(".cards-container");

menuEmail.addEventListener("click", ()=> { toggleSlider(desktopMenu);});
burguerIcon.addEventListener("click", ()=> { toggleSlider(mobileMenu);});
navbarShoppingCart.addEventListener("click", ()=> { toggleSlider(shoppingCardContainer);} );

productDetailCloseIcon.addEventListener("click", closeProductDetail);

function closeSliders (element) {
    slidingElements.forEach( slider => {
        if(element != slider) {
            slider.classList.add("inactive");
        }
    });
}

function toggleSlider(slider) {
    closeSliders(slider);
    slider.classList.toggle("inactive");
}

function openProductDetail() {
    closeSliders(productDetailContainer);
    productDetailContainer.classList.remove("inactive");
}

function closeProductDetail() {
    productDetailContainer.classList.add("inactive");
}

const productList = [];
const productListInTheCart = [];

productList.push( {
    name: "Bike",
    price: 120,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
});

productList.push( {
    name: "Mono",
    price: 40,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
});

productList.push( {
    name: "Aire",
    price: 1000,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
});

productList.push( {
    name: "fnjaknakjlf",
    price: 0,
    image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
});

function renderProducts(arr) {
    for(product of arr) {
        /* Creacion de etiquetas agregando contenido y clases */
        const productCart = document.createElement("div");
        productCart.classList.add("product-card");
    
        const productImage = document.createElement("img");
        productImage.setAttribute ( "src", "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
        productImage.classList.add("product-detail-image");
        productImage.addEventListener("click", openProductDetail);

        const productInfo = document.createElement("div");
        productInfo.classList.add("product-info");
    
        const productInfoDiv = document.createElement("div");
    
        const productPrice = document.createElement("p");
        productPrice.innerHTML = "$ "+ product.price;
    
        const productName = document.createElement("p");
        productName.innerHTML = product.name;
    
        const productInfoFigure = document.createElement("figure");
        const productImgCart = document.createElement("img");
        productImgCart.setAttribute("src", "./icons/bt_add_to_cart.svg");
        productImgCart.setAttribute("alt", "Añadir producto al carrito");
        productImgCart.addEventListener("click", () => { addProductToCart(product);});
    
        /* Agregando cada etiqueta de su correspondiente etiqueta */
    
        productInfoFigure.appendChild(productImgCart);
    
        productInfoDiv.appendChild(productPrice);
        productInfoDiv.appendChild(productName);
    
        productInfo.appendChild(productInfoDiv);
        productInfo.appendChild(productInfoFigure);
    
        productCart.appendChild(productImage);
        productCart.appendChild(productInfo);
    
        cardsContainer.appendChild(productCart);
        console.log(product);
    }
}

function addProductToCart(product) {
    console.log(product);
    if(productListInTheCart.includes(product)) {

    } else {
        const order = document.querySelector(".order");
        const card = createShoppingCart(product);
        order.insertAdjacentElement("beforebegin", card);
        productListInTheCart.push({
            div: card,
            product: product
        });
        renderCart(productListInTheCart);
    }
}

function removeProductToCart(product) {
    console.log("Entro");
    if(productListInTheCart.some(element => element.product == product )) {
        const myOrderContent = document.querySelector(".my-order-content");
        const index = productListInTheCart.map(element => element.product).indexOf(product);
        myOrderContent.removeChild(productListInTheCart[index].div);
        productListInTheCart.splice(index, 1);
        console.log(productListInTheCart);
        renderCart(productListInTheCart);
    }
}

function createShoppingCart(product) {
    const shoppingCard = document.createElement("div");
    shoppingCard.classList.add("shopping-cart");

    const shoppingCardFigure = document.createElement("figure");
    const image = document.createElement("img");
    image.setAttribute("src", product.image);
    image.setAttribute("alt", "Imagen del producto");

    const shoppingCardPrice = document.createElement("p");
    shoppingCardPrice.innerHTML = "$ "+ product.price;

    const shoppingCardName = document.createElement("p");
    shoppingCardName.innerHTML = product.name;

    const iconClose = document.createElement("img");
    iconClose.setAttribute("src", "./icons/icon_close.png");
    iconClose.setAttribute("alt", "close");
    iconClose.classList.add("removeCartIcon");
    iconClose.addEventListener("click", () => { removeProductToCart(product);});

    shoppingCardFigure.appendChild(image);
    shoppingCard.appendChild(shoppingCardFigure);
    shoppingCard.appendChild(shoppingCardName);
    shoppingCard.appendChild(shoppingCardPrice);
    shoppingCard.appendChild(iconClose);

    return shoppingCard;
}

function renderCart(listInTheCart) {
    const numberOfProductsContainer = document.querySelector("#numberOfProductsInTheCart");
    numberOfProductsContainer.innerHTML = listInTheCart.length;
    updateTotalPrice();
}

function updateTotalPrice() {
    let total = 0;
    for(element of productListInTheCart) {
        total += element.product.price;
    }
    const totalPrice = document.querySelector("#totalPrice");
    totalPrice.innerHTML = "$ "+ total;
}

renderProducts(productList);
renderCart(productListInTheCart);