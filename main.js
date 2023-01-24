const menuEmail = document.querySelector(".navbar-email");
const desktopMenu = document.querySelector(".desktop-menu");

const burguerIcon = document.querySelector(".menu");
const mobileMenu = document.querySelector(".mobile-menu");

const navbarShoppingCart = document.querySelector(".navbar-shopping-cart");
const productDetail = document.querySelector(".product-detail");

const slidingElements = [ desktopMenu, mobileMenu, productDetail ];

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