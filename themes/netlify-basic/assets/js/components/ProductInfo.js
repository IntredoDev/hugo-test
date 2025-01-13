export default class ProductInfo {
    constructor()
    {
        this.retailPrice = sessionStorage.getItem('retailPrice')
        this.discountedPrice = sessionStorage.getItem('discountedPrice')
        this.currency = sessionStorage.getItem('currency')
        this.freeShipping = sessionStorage.getItem('freeShipping')
        this.productImage = sessionStorage.getItem('productImage')
        this.quantity = sessionStorage.getItem('quantity')
        this.ebook = sessionStorage.getItem('ebook')
        this.gifts = sessionStorage.getItem('gifts')
        this.shippingCost = sessionStorage.getItem('shippingCost')
        this.totalPrice = parseInt(this.discountedPrice) + parseInt(this.shippingCost);

        this.quantityText = this.quantity > 1 ? this.quantity : this.quantity;

        this.checkoutImage = document.querySelector('.checkout__image')
        this.summaryName = document.querySelector('.product-summary__name')

        this.retailPriceValue = document.querySelector('[data-js-retail-price-value]');
        this.discountedPriceValue = document.querySelector('[data-js-discounted-price-value]');
        this.shippingValue = document.querySelector('[data-js-shipping-value]');
        this.totalPriceValue = document.querySelector('[data-js-total-value]');

    }

    init()
    {
        this.fillProductInfo()
    }

    fillProductInfo()
    {
   
        this.checkoutImage ? this.checkoutImage.src = this.productImage : '';
        if(this.summaryName) {
          this.summaryName.textContent = `${this.quantityText}X COLLAGENICO ${this.ebook == 'true' ? ' + Ebook' : ''}  ${this.gifts ? this.gifts : ''}  `
        }

        this.retailPriceValue.textContent = `${this.retailPrice} ${this.currency}`
        this.discountedPriceValue.textContent = `${this.discountedPrice} ${this.currency}`
        this.shippingValue.textContent = `${this.shippingCost} ${this.currency}`
        this.totalPriceValue.textContent = `${this.totalPrice} ${this.currency}`
    }
}