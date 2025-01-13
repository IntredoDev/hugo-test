import Button from "./components/Button.js";
import Carousel from "./components/Carousel.js";
import Modal from "./components/Modal.js";
import Accordions from "./components/Accordions.js";
import ContactForm from "./components/ContactForm.js";
import Set from "./components/Set.js";
import Cookiebot from "./components/Cookiebot.js";
import PrivacySettingsButton from "./components/PrivacySettingsButton.js";

document.addEventListener('DOMContentLoaded', () => {
    const _button = new Button();
    _button.init() 
 
    const _modal = new Modal();
    _modal.init()
 
    if( document.body.classList.contains('home')) {
        const _carousel = new Carousel()
        _carousel.init()

        const _set = new Set()
        _set.init()
    }

    if( document.body.classList.contains('home') || 
        document.body.classList.contains('page-faq')){
        const _accordions = new Accordions()
        _accordions.init();
     }

     if(document.body.classList.contains('page-contact')) {
        const _contactForm = new ContactForm()

        _contactForm.init()
     }
})

if(document.body.classList.contains('production')) {
    window.addEventListener('load', () => {
        const _cookiebot = new Cookiebot();
        _cookiebot.init();

        setTimeout(() => {
            const _privacySettingsButton = new PrivacySettingsButton()
            _privacySettingsButton.init()
        }, 3001)
    })
}