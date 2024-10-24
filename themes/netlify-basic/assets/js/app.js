import Button from "./components/Button.js"
import SaleForm from "./components/SaleForm.js";
import Modal from "./components/Modal.js";
import Toc from "./components/Toc.js";
 
window.addEventListener('DOMContentLoaded', () => {
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
})