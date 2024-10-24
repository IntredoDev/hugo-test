export default class Modal {
    constructor()
    {
        this.modals = document.querySelectorAll('[data-js-modal]')
        this.ingredientsModal = document.querySelector('[data-js-ingredients-modal]')
        this.ingredientsButtons = document.querySelectorAll('[data-js-target-modal]')
    }

    init(){
        if(this.modals.length < 1) {
            return false;
        }

        this.modals?.forEach(modal => {
            let closeBtn = modal.querySelector('[data-js-close-modal]')
            this.closeModal(closeBtn)
        })

        this.openIngredientsModal(this.ingredientsButtons, this.ingredientsModal)
    }

    openIngredientsModal(buttons, modal) {

        if(buttons.length < 1 || !this.ingredientsModal) {
            return
        }

        const handleButton = (button) => {
            let attrs = this.getButtonAttributes(button)

            this.passAttributesToModal(attrs, this.ingredientsModal)
            this.openModal(this.ingredientsModal)
        }


       buttons.forEach(button => {
        button.addEventListener('click', () => handleButton(button))
       })

    }

    passAttributesToModal(attributes, modal) {
        if( !attributes || !modal ) {
            return
        }

        let modalTitle = modal.querySelector('.modal-ingredients__title')
        let modalImg = modal.querySelector('.modal-ingredients__thumbnail')
        let modalContent = modal.querySelector('.modal-ingredients__desc')

        modalTitle.innerHTML = attributes.title
        modalImg.src = attributes.imageSrc
        modalContent.innerHTML = attributes.content

    }

    getButtonAttributes(button)
    {
        if(!button){
            return
        }
        let obj;
        let getTitle = button.getAttribute('data-content-title')
        let getImage = button.getAttribute('data-content-img')
        let getContent = button.getAttribute('data-content')

        return obj = {
            "title": getTitle,
            "imageSrc": getImage,
            "content": getContent
        }
    }

    openModal(selector) {
        const rootParent = selector.closest('.overlay');

        if (rootParent) {
            rootParent.classList.remove('hidden');
            rootParent.classList.add('flex');
        }
    }

    closeModal(close) {
        if(!close) {
            return false;
        }

        close.addEventListener('click', () => {
            const rootParent = close.closest('.overlay')
        
            if(!rootParent) {
                return false
            }

            rootParent.classList.add('hidden');
            rootParent.classList.remove('flex')
        })
    }
}