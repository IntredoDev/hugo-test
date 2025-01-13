import ProductInfo from "./components/ProductInfo.js";
import SaleForm from "./components/SaleForm.js";
import Timer from "./components/Timer.js";

document.addEventListener('DOMContentLoaded', () => {
    const _saleForm = new SaleForm()
    _saleForm.init()

    const _timer = new Timer()
    _timer.init()
 
    const _productInfo = new ProductInfo()
    _productInfo.init()
})