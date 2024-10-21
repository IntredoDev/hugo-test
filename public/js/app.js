import Button from "./components/Button.js"
import SaleForm from "./components/SaleForm.js";

window.addEventListener('DOMContentLoaded', () => {
    const _button = new Button();
    _button.init()

    const _saleForm = new SaleForm();
    _saleForm.init()
})