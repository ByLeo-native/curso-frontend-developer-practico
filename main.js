const baseURL = 'https://api.escuelajs.co/api/v1/';

const get = async (url = "") => {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', baseURL+url);
        request.onload = function() {
            if (request.status === 200) {
                const data = JSON.parse(request.responseText);
                resolve(data);
            } else {
                reject(new Error('No se pudieron obtener los productos'));
            }
        };
        request.onerror = function() {
            reject(new Error('Error de red al intentar obtener los productos'));
        };
        request.send();
    });
    
}

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
const order = document.querySelector(".order");
const buttonCheckout = document.querySelector(".primary-button");

menuEmail.addEventListener("click", ()=> { toggleSlider(desktopMenu);});
burguerIcon.addEventListener("click", ()=> { 
    toggleSlider(mobileMenu);
    if(mobileMenu.classList.contains('inactive')) {
        document.querySelector('.main-container').classList.remove("inactive");
    } else {
        document.querySelector('.main-container').classList.add('inactive');
    }
});
navbarShoppingCart.addEventListener("click", ()=> { toggleSlider(shoppingCardContainer);} );

productDetailCloseIcon.addEventListener("click", closeProductDetail);

const closeShoppingCartIcon = document.querySelector("#shoppingCardContainer .title-container img");
closeShoppingCartIcon.addEventListener("click", closeSliders);

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

/* Abrir Product Detail */

function openProductDetail(product) {
    closeSliders(productDetailContainer);
    updateInfoInTheProductDetail(product);
    productDetailContainer.classList.remove("inactive");
}

function closeProductDetail() {
    productDetailContainer.classList.add("inactive");
}

function updateInfoInTheProductDetail(product) {
    const img = document.querySelector("#product-detail > img:nth-child(2)");
    img.setAttribute("src", product.images[0]);
    const price = document.querySelector("#product-detail .product-info p:nth-child(1)");
    price.innerHTML = "$ " + product.price;
    const name = document.querySelector("#product-detail .product-info p:nth-child(2)");
    name.innerHTML = product.title;
    const description = document.querySelector("#product-detail .product-info p:nth-child(3)");
    description.innerHTML = product.description;
    const buttonAddToCart = document.querySelector(".product-info .primary-button");
    buttonAddToCart.addEventListener("click", () => { addProductToCart(product)})
}

/* Agregar productos en la seccion principal */
const productListInTheCart = [];

async function renderProducts() {
    try {
        let arr = await get('products?offset=0&limit=20');
        /**
         * Importancia de usar let en el for ya que por hoisting en el aniadir evento se pasaba siempre el ultimo elemento del array y afectaba al aniadir al carrito
         */
        for(let product of arr) {
            /* Creacion de etiquetas agregando contenido y clases */
            const productCart = document.createElement("div");
            productCart.classList.add("product-card");
        
            const productImage = document.createElement("img");
            productImage.setAttribute ( "src", product.images[0]);
            productImage.setAttribute( "alt", "Imagen del producto");
            productImage.classList.add("product-detail-image");
            productImage.addEventListener("click", () => {
                openProductDetail(product);
            });

            const productInfo = document.createElement("div");
            productInfo.classList.add("product-info");
        
            const productInfoDiv = document.createElement("div");
        
            const productPrice = document.createElement("p");
            productPrice.innerHTML = "$ "+ product.price;
        
            const productName = document.createElement("p");
            productName.innerHTML = product.title;
        
            const productInfoFigure = document.createElement("figure");
            const productImgCart = document.createElement("img");
            productImgCart.setAttribute("src", "./icons/bt_add_to_cart.svg");
            productImgCart.setAttribute("alt", "Añadir producto al carrito");
            productImgCart.addEventListener("click", () => { 
                addProductToCart(product);
            });
        
            /* Agregando cada etiqueta de su correspondiente etiqueta */
        
            productInfoFigure.appendChild(productImgCart);
        
            productInfoDiv.appendChild(productPrice);
            productInfoDiv.appendChild(productName);
        
            productInfo.appendChild(productInfoDiv);
            productInfo.appendChild(productInfoFigure);
        
            productCart.appendChild(productImage);
            productCart.appendChild(productInfo);
        
            cardsContainer.appendChild(productCart);
        }
    } catch (error){
        console.log(error.message);
    }
}

/* Aniadir producto al carrito */

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

/* Crea carta del carrito */

function createShoppingCart(product) {
    const shoppingCard = document.createElement("div");
    shoppingCard.classList.add("shopping-cart");

    const shoppingCardFigure = document.createElement("figure");
    const image = document.createElement("img");
    image.setAttribute("src", product.images[0]);
    image.setAttribute("alt", "Imagen del producto");

    const shoppingCardPrice = document.createElement("p");
    shoppingCardPrice.innerHTML = "$ "+ product.price;

    const shoppingCardName = document.createElement("p");
    shoppingCardName.innerHTML = product.title;

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

function unlockCheckout() {
    order.classList.remove("inactive");
    buttonCheckout.classList.remove("inactive-button");
}

function blockCheckout() {
    order.classList.add("inactive");
    buttonCheckout.classList.add("inactive-button");
}

// Renderiza las categorias
async function renderCategories() {
    const navbarCategories = document.querySelector(".navbar-left__categories");
    const mobileMenu = document.querySelector(".mobile-menu");
    const listOfCategoriesOfMobileMenu = document.createElement('ul'); 

    const arr = await get('categories?offset=0&limit=5');
    
    for(let categorie of arr) {
        const navbarCategorie = crearEtiqueta(categorie);
        const mobileMenuCategorie = crearEtiqueta(categorie);

        navbarCategories.appendChild(navbarCategorie);
        listOfCategoriesOfMobileMenu.appendChild(mobileMenuCategorie);
    }

    const anterior = mobileMenu.firstElementChild;
    anterior.insertAdjacentElement('afterend', listOfCategoriesOfMobileMenu);

    function crearEtiqueta(element) {
        const listItem = document.createElement("li");
        const ancle = document.createElement('a');
        ancle.href = "/";
        ancle.innerHTML = element.name;
        listItem.appendChild(ancle);

        return listItem;
    }
}

renderProducts();
renderCategories();
//renderProducts(productList);
renderCart(productListInTheCart);