export default class ContactForm {
    constructor()
    {
        this.contactForm = document.querySelector('.contact-form')
        this.action = this.contactForm.action;
        this.select = this.contactForm.querySelector('#contact-select')
        this.email = this.contactForm.querySelector('#email')
        this.name = this.contactForm.querySelector('#name')
        this.orderId = this.contactForm.querySelector('#order-id')
        this.message = this.contactForm.querySelector('#message')
    }

    init()
    {
        if(!this.contactForm) {
            return
        }

        this.send()
    }

    send()
    {
        const submit = this.contactForm.querySelector('.contact-form__submit')

        submit.addEventListener('click', (e) => {
            e.preventDefault()

            const messageElement = this.contactForm.querySelector('.message-wrap')

            let xhr = new XMLHttpRequest();
            let message;

            const data = JSON.stringify(
                {
                    'formData': {
                        'email': this.email.value,
                        'topic': this.select.options[this.select.selectedIndex].text,
                        'name': this.name.value,
                        'orderId': this.orderId.value,
                        'message': this.message.value,
                    },
                    'action': this.action
                }
            );

            xhr.withCredentials = true;

            xhr.open('POST', './contact.php', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(data);

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        let message;

                        if (response && response.status === 'success') {
                            message = this.createMessage('Wiadomość została wysłana. Dziękujemy!', false);
                            messageElement.append(message);
                        } else {
                            console.error('Error:', response.message || 'Unknown error');
                            message = this.createMessage('Błąd podczas wysyłki. Spróbuj jeszcze raz.', true);
                            messageElement.append(message);
                        }
                    } catch (e) {
                        console.error('Parsing error:', e);
                        const message = this.createMessage('Błąd podczas wysyłki. Spróbuj jeszcze raz.', true);
                        messageElement.append(message);
                    }
                } else {
                    console.error('Request failed. Returned status of ' + xhr.status);
                }
            };
        
        })
    }

    createMessage(message, warning) {
        let para = document.createElement('p')

        para.classList.add('contact-message')
        warning ? para.classList.add('text-alert') :  para.classList.add('text-green')
        para.innerHTML = message

        return para
    }
}