import { desktopBreakpoint, desktopHeaderHeight } from "../helpers/constants.js";

export default class Toc {
    constructor()
    {
        this.listItems = Array.from(document.querySelectorAll('[data-js-toc-list-item]'))
        this.tocTargets = Array.from(document.querySelectorAll('[data-js-toc-item-target]'))
    } 

    init() {
        if (this.listItems.length < 1 || this.tocTargets.length < 1) {
            return false;
        }

        this.listItems.forEach(item => {
            item.addEventListener('click', (event) => this.handleItemClick(event));
        });
    }

    handleItemClick(event) {
        event.preventDefault()
        
        const targetValue = event.target.getAttribute('data-js-toc-list-item');
        const targetElement = this.tocTargets.find(target => target.getAttribute('data-js-toc-item-target') === targetValue);

        if (!targetElement) {
            return false
        }

        let offsetTop = targetElement.offsetTop;

        if (window.matchMedia(desktopBreakpoint).matches) {
            offsetTop -= desktopHeaderHeight;
        }

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth' 
        });
    }
}