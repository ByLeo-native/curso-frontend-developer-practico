const menuEmail = document.querySelector(".navbar-email");
const desktopMenu = document.querySelector(".desktop-menu");

const burguerIcon = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");

const navbarShoppingCart = document.querySelector(".navbar-shopping-cart");
const productDetail = document.querySelector(".product-detail");

const slidingElements = [ desktopMenu, mobileMenu, productDetail ];

const cardsContainer = document.querySelector(".cards-container");

menuEmail.addEventListener("click", ()=> { toggleSlider(desktopMenu);});
burguerIcon.addEventListener("click", ()=> { toggleSlider(mobileMenu);});
navbarShoppingCart.addEventListener("click", ()=> { toggleSlider(productDetail);} );

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

const productList = [];

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

/* <!-- <div class="product-card">
        <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="">
        <div class="product-info">
          <div>
            <p>$120,00</p>
            <p>Bike</p>
          </div>
          <figure>
            <img src="./icons/bt_add_to_cart.svg" alt="">
          </figure>
        </div>
      </div> --> 
*/

function renderProducts(arr) {
    for(product of arr) {
        /* Creacion de etiquetas agregando contenido y clases */
        const productCart = document.createElement("div");
        productCart.classList.add("product-card");
    
        const productImage = document.createElement("img");
        productImage.setAttribute ( "src", "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    
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
}

renderProducts(productList);