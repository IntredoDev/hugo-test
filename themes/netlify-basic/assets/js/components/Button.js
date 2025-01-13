import { scrollTo } from "../helpers/helpers.js";

export default class Button {
    constructor()
    {
        this.buttons = Array.from(document.querySelectorAll('[data-js-form-target]'));
        this.saleFormSection = document.getElementById('order');
    }

    init()
    {
        if(this.buttons.length < 1 || !this.saleFormSection ) {
            return
        }

        this.buttons.forEach(button => {           
            button.addEventListener('click', () => scrollTo(this.saleFormSection, 'auto'));
        });
    }
}