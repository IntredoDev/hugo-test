import Button from "./components/Button.js";
import Carousel from "./components/Carousel.js";
import SaleForm from "./components/SaleForm.js";
import Modal from "./components/Modal.js";
import Toc from "./components/Toc.js";
import Accordions from "./components/Accordions.js";
// import PhoneInput from "./components/PhoneInput.js";

document.addEventListener('DOMContentLoaded', () => {
    const _button = new Button();
    _button.init() 

    const _saleForm = new SaleForm();
    _saleForm.init() 
 
    const _modal = new Modal();
    _modal.init()
 
    if(window.document.body.classList.contains('page-terms')) {
        const _toc = new Toc();
        _toc.init();
    }

    if( document.body.classList.contains('home')) {
        const _carousel = new Carousel()
        _carousel.init()
    }

    // if( document.body.classList.contains('home')){
    //     const _tel = new PhoneInput()
    //     _tel.init()
    // }

    if( document.body.classList.contains('home') || 
        document.body.classList.contains('page-faq')){
        const _accordions = new Accordions()
        _accordions.init();
     }
})