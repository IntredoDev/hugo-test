export default class Carousel
{
    constructor() {
       this.splides = document.querySelectorAll('.splide-carousel');
    }

    init() {
        if(this.splides.length < 1) {
            return 
        }

        this.splides.forEach(splideElement => {
            const splide = new Splide(splideElement, {
                type: 'carousel',
                speed: 1500,
                pagination: false,
                arrows: false,
                gap: 24,
                perPage: 1.44,
                mediaQuery: 'min',
                classes: {
                    prev: 'splide__arrow--prev',
                    next: 'splide__arrow--next',
                },
                breakpoints: {
                    1024: {
                        destroy: true
                    },
                    600: {
                        perPage: 2.44,
                    }
                }
            });
    
            splide.mount();
        });
    }
}