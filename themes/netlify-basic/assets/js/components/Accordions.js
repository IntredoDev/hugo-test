import Accordion from 'accordion-js/dist/accordion.js'

export default class Accordions {
    constructor()
    {
        this.accordion = document.querySelector('.accordion-container')    }

    init() {
        if(!this.accordion) {
            return 
        }

        new Accordion(this.accordion, {
            duration: 450
        });
    }
}