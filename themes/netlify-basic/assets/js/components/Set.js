export default class Set {
    constructor() {
        this.buttons = document.querySelectorAll('.set__list-button');
    }

    init() {
        if (this.buttons.length < 1) {
            return;
        }

        this.setListEvents();
    }

    setListEvents() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', (event) => this.handleEvent(btn, event));
        });
    }

    handleEvent(button, event) {
        this.buttonEvent(button);
    }

    buttonEvent(button) {
     const retailPrice = button.getAttribute('data-js-retail-price')
     const discountedPrice = button.getAttribute('data-js-discounted-price')
     const currency = button.getAttribute('data-js-currency')
     const freeShipping = button.getAttribute('data-js-free-shipping')
     const productImage = button.getAttribute('data-js-product-image')
     const quantity = button.getAttribute('data-js-quantity')
     const ebook = button.getAttribute('data-js-ebook')
     const gifts = button.getAttribute('data-js-gifts')
     const shippingCost = button.getAttribute('data-js-shipping-cost')

     sessionStorage.setItem('retailPrice', retailPrice);
     sessionStorage.setItem('discountedPrice', discountedPrice);
     sessionStorage.setItem('currency', currency);
     sessionStorage.setItem('freeShipping', freeShipping);
     sessionStorage.setItem('productImage', productImage);
     sessionStorage.setItem('quantity', quantity)
     sessionStorage.setItem('ebook', ebook)
     sessionStorage.setItem('gifts', gifts)
     sessionStorage.setItem('shippingCost', shippingCost)
    }
}