import { scrollTo } from "../helpers/helpers.js";

export default class Button {
    constructor()
    {
        this.buttons = Array.from(document.querySelectorAll('[data-js-form-target]'));
        this.saleForm = document.getElementById('sale-form');
    }

    init()
    {
        if(this.buttons.length < 1 || !this.saleForm ) {
            return
        }

        this.buttons.forEach(button => {           
            button.addEventListener('click', () => scrollTo(this.saleForm, 'auto'));
        });
    }
}