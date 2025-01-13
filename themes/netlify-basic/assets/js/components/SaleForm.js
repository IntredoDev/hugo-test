import { dictLocale } from "../helpers/dictLocale.js";
import { preventInputChars } from "../helpers/helpers.js";

export default class SaleForm {
    constructor()
    {
        this.saleForms = document.querySelectorAll('[data-js-sale-form]')
        this.radioGroupContainers = document.querySelectorAll('.radios-list');

    }

    init()
    {
        if(this.saleForms.length < 1) {
            return
        }

        let globalConfig = [];

        this.saleForms.forEach(form => {
            let validator = new window.JustValidate(form, {
                successFieldCssClass: 'is-valid',

            })

            //this.selectPaymentGroup()
            this.radiosEvents()

            preventInputChars(form, '#postal-code')


            this.validate(validator)
     
            this.successValidation(validator, form)
            
            const labelElement = document.querySelector('label[for="country"]');

            if (labelElement) {
                labelElement.classList.add('validation-success');
            }

        })
    }

    addClassToRadioItem(radios)
    {

        if(radios.length < 1) {
            return 
        }

        radios.forEach(radio => {
            const formItem = radio.closest('.radio-item');
            
            if (formItem) {
                if (radio.checked) {
                    formItem.classList.add('active');
                } else {
                    formItem.classList.remove('active');
                }
            }
        })
    }

    selectPaymentGroup(){
        const radios = document.querySelectorAll('[data-js-radio-item] input');

        if (radios.length < 1) {
            return
        }

        radios[0].checked = true;

        this.addClassToRadioItem(radios)
    }

    radiosEvents()
    {
     
        const radios = document.querySelectorAll('[data-js-radio-item] input');
    

        if (radios.length < 1) {
            return
        }

        radios.forEach(radio => {
            radio.addEventListener('change', () => {

                if (radio.name === 'cashOnDelivery-choice') {
                    this.changeCashOnDeliveryValue(radio)
                }

                this.addClassToRadioItem(radios)
            });
        });
    }

    changeCashOnDeliveryValue(radio)
    {
        let jsCOD = document.querySelector('.js-cash-on-delivery');

        jsCOD.value = radio.value
    }

    validate(validator)
    {

        if(!validator) {
            return
        }

        validator.onFail((fields) => {
       
            Object.keys(fields).forEach(fieldName => {
                let field = fields[fieldName];
                const parentElement = field.elem.closest('.form-sale__label');
                

                if(!field.isValid) {
                    if (parentElement) {
                        parentElement.classList.add('has-error');
                    }
                } else {
                    if (parentElement.classList.contains('has-error')) {
                        parentElement.classList.remove('has-error');
                    }
                }
            });


            const manageClasses = (containers) => {
                containers.forEach(container => {
                    let radios = container.querySelectorAll('.radio-input');
                    let isSelected = Array.from(radios).some(radio => radio.checked);
                    if (!isSelected) {
                        container.classList.add('has-error');
                    } else {
                        if (container.classList.contains('has-error')) {
                            container.classList.remove('has-error');
                        }
                    }
                })
            };

            if(this.radioGroupContainers.length > 0) {
                manageClasses(this.radioGroupContainers)
            }
        })
        validator
            .addField('#name', [
                {
                    rule: 'required',
                    errorMessage: 'Proszę wpisać imię i nazwisko'
                },
                {
                    rule: 'customRegexp',
                    value: /^[^\d\s]+(?:\s+[^\d\s]+)+(?:\s)?$/,
                    errorMessage: 'Imię i nazwisko musi zawierać co najmniej 2 wyrazy'
                }
            ])
            .addField('#phone', [
                {
                    rule: 'required',
                    errorMessage: 'Proszę wpisać swój numer telefonu'
                },
                {
                    rule: 'minLength',
                    value: 9,
                    errorMessage: 'Numer telefonu musi składać się z conajmniej 9 cyfr'
                },

            ])
            .addField('#street', [
                {
                    rule: 'required',
                    errorMessage: 'Ulica musi zawierać nazwę oraz numer'
                },
                {
                    rule: 'customRegexp',
                    value: /^(?=.*\d)(?=.*\b\w+\b.*\b\w+\b).*$/,
                    errorMessage: 'Ulica musi zawierać nazwę oraz numer'
                }
            ])
            .addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'Proszę wpisać adres e-mail, przykładowo: nazwa@domena.com'
                },
                {
                    rule: 'email',
                    errorMessage: 'Proszę wpisać poprawny adres e-mail, przykładowo: nazwa@domena.com',
                }
            ])
            .addField('#postal-code', [
                {
                    rule: 'required',
                    errorMessage: 'Proszę wpisać kod pocztowy, przykładowo: 00-000'
                },
                {
                    rule: 'minLength',
                    value: 5,
                    errorMessage: 'Kod pocztowy powinien zawierać przynajmniej 6 znaków, przykładowo: 00-000'
                },
                {
                    rule: 'maxLength',
                    value: 6,
                    errorMessage: 'Kod pocztowy powinien zawierać maksymalnie 6 znaków, przykładowo: 00-000'
                },
                {
                    rule: 'customRegexp',
                    value: /^[a-z0-9][-a-z0-9 ]{0,10}[a-z0-9]$/,
                    errorMessage: 'Proszę wpisać poprawny kod pocztowy, przykładowo: 00-000'
                }
            ])
            .addField('#city', [
                {
                    rule: 'required',
                    errorMessage: 'Proszę wpisać miejscowość'
                },
                {
                    rule: 'minLength',
                    value: 3,
                    errorMessage: 'Nazwa miejscowości powinna zawierać minimum 3 litery'
                },
                {
                    rule: 'customRegexp',
                    value: /^[^\d]*$/,
                    errorMessage: 'Proszę wpisać poprawną miejscowość',
                },
            ])
            .addField('#country', [
                {
                    rule: 'required',
                    errorMessage: 'Proszę wybrać kraj'
                }
            ])
            .addRequiredGroup(
                '#newsletter-radios-list', 
                'Proszę wybrać opcje, aby kontynuować'
            )
            .addRequiredGroup(
                '.form-sale__payment-list', 
                'Proszę wybrać opcje, aby kontynuować' 
            );

        this.fieldRevalidation(validator, '#name')
        this.fieldRevalidation(validator, '#email')
        this.fieldRevalidation(validator, '#phone')
        this.fieldRevalidation(validator, '#street')
        this.fieldRevalidation(validator, '#postal-code')
        this.fieldRevalidation(validator, '#city')
        this.jQueryfieldRevalidation(validator, '#country', 'change')
        this.radioGroupValidation(this.radioGroupContainers)
    }
   
    successValidation(validator, form) {
        validator.onSuccess(( event ) => {
            this.send( event, form )
        });    
    }

    
    radioGroupValidation(radioContainers)
    {

        if (radioContainers.length < 1) {
            return;
        }
    
        radioContainers.forEach((container) => {
            let radioInputs = container.querySelectorAll('.radio-input');

            const manageClasses = (container) => {
                let isSelected = Array.from(radioInputs).some(radio => radio.checked);
                if (!isSelected) {
                    container.classList.add('has-error');
                } else {
                    if (container.classList.contains('has-error')) {
                        container.classList.remove('has-error');
                    }
                }
            };
    
            radioInputs.forEach(radio => {
                radio.addEventListener('change', () => {
                    manageClasses(container);
                });
            });
        });
    }

    jQueryfieldRevalidation(validator, selector, handlerEvent)
    {
        let input = $(selector);

        if(!validator || !input) {
            return 
        }

        if (!handlerEvent) {
            handlerEvent = 'blur'
        }

       input.on(handlerEvent, () => {
            validator.revalidateField(selector).then(isValid => {
                let rootElem = input.closest('.form-sale__label')
            
                if(isValid) {
                    if(rootElem.hasClass('has-error')) {
                        rootElem.removeClass('has-error')
                    }

                    rootElem.addClass('validation-success')

                    $('.select2-container').addClass('is-valid')

                    if($('.select2-container').hasClass('just-validate-error-field')) {
                        $('.select2-container').removeClass('just-validate-error-field')
                    }

                } else {
                    if(rootElem.hasClass('validation-success')) {
                        rootElem.removeClass('validation-success')
                    }

                    rootElem.addClass('has-error')

                    if($('.select2-container').hasClass('is-valid')) {
                        $('.select2-container').removeClass('is-valid')
                    }

                    $('.select2-container').addClass('just-validate-error-field')

                }
            });
        });
    }

    fieldRevalidation(validator, selector, handlerEvent)
    {
        let input = document.querySelector(selector);

        if(!validator || !input) {
            return 
        }

        if (!handlerEvent) {
            handlerEvent = 'blur'
        }

        input.addEventListener(handlerEvent, () => {
            validator.revalidateField(selector).then(isValid => {
                let rootElem = input.closest('.form-sale__label')

                if(isValid) {
                    rootElem.classList.add('validation-success')
    
                    if(rootElem.classList.contains('has-error')) {
                        rootElem.classList.remove('has-error')
                    }
    
                } else {

                if(rootElem.classList.contains('validation-success')) {
                    rootElem.classList.remove('validation-success')
                }
    
                rootElem.classList.add('has-error')
                }
            });
        });
        
    }

    send(event, form)
    {
        event.preventDefault();
        const loader = form.querySelector('.loader');

        if(!form) {
            return
        }

        let data = null;
        let clientIPstatus = '';
        let codBoolean = true;
        let clientIP = getClientIP();
        let formType = form;

        let customerPrefix = formType.querySelector('#customerPrefix');
        let shortLead = formType.querySelector('#shortLead');
        let customerPhone = formType.querySelector('#phone');
        let customerFullName = document.getElementsByName('name')[0];
        let customerEmail = document.getElementsByName('email')[0];

        let customerAddress = formType.querySelector('#street');
        let customerCity = formType.querySelector('#city');
        let customerPostcode = formType.querySelector('#postal-code');
        let customerCountryCode = formType.querySelector('[data-js-country]');
        let cashOnDelivery = formType.querySelector('#cashOnDelivery');
        
        let redirect = formType.querySelector('#redirect');
        let pageAction = formType.querySelector('#action');
        let offerId = formType.querySelector('#offerId');

        let button = formType.querySelector('#submit');

        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        loader.style.display = 'inline-block';

    
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                if (this.responseText) {
                    let json = JSON.parse(this.responseText);
                    if (json['status'] === 'ok' && pageAction.value === 'affshort') {
                        button.style.visibility = 'hidden';
                        if (redirect.value) {
                            window.location.href = redirect.value + '?' + prepareURI(getQueryString());
                        }
                    }

                    console.log(json['shopConfirmed'])
                    
                    if (json['shopConfirmed'] === true && pageAction.value === 'affcreate') {
                        button.style.visibility = 'hidden';
                        if (redirect.value) {
                            window.location.href = redirect.value + '?' + prepareURI(getQueryString());
                        }
                    }
                }
            } else {
                loader.style.display = 'none';
            }
        });

        xhr.onerror = function() {
            console.error('Network error occurred.');
            loader.style.display = 'none';
        };


        button.disabled = true;
        button.style.filter="grayscale(1)";

        if (customerFullName.reportValidity() === false) {
            return;
        }
        if (customerPhone.reportValidity() === false) {
            return;
        }

    
        if (cashOnDelivery.value === "true") {
            codBoolean = true;
        } else {
            codBoolean = false;
        }

        data = JSON.stringify({
            'data': {
                'shortLead': shortLead.value,
                'customerFullName': customerFullName.value,
                'customerPhone': customerPrefix.value + customerPhone.value,
                'customerEmail': customerEmail.value,
                'customerAddress': customerAddress.value,
                'customerCity': customerCity.value,
                'customerPostcode': customerPostcode.value,
                'customerCountryCode': customerCountryCode.value,
                'cashOnDelivery': codBoolean,
                'customerIp': clientIP,
                'offerId': parseInt(offerId.value),
                'apiKey': 'TqMsRV310UkNzBF' // TEST API KEY
            },
            'action': pageAction.value
        });
     
        xhr.open('POST', './affcreate.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(data);

        form.addEventListener("input", function () {
            button.disabled = false;
            button.style.filter="grayscale(0)";
        });


        function prepareURI(object) {
            let out = [];
            for (let key in object) {
                if (object.hasOwnProperty(key) && key !== '') {
                    out.push(key + '=' + encodeURIComponent(object[key]));
                }
            }
            const index = out.indexOf('paymentLink=undefined');
            if (index > -1) {
                out.splice(index, 1);
            }
            out.push('confirm=/confirm');
            out = out.filter(function (value, index, array) {
                return array.indexOf(value) === index;
            });
            return out.join('&');
        }

        function getQueryString() {
            const query = window.location.search.substring(1);
            let query_string = {};
            if (query !== '') {
                const vars = query.split("&");
                for (let i = 0; i < vars.length; i++) {
                    let pair = vars[i].split("=");
                    let key = decodeURIComponent(pair[0]);
                    let value = decodeURIComponent(pair[1]);
                    if (typeof query_string[key] === "undefined") {
                        query_string[key] = decodeURIComponent(value);
                    } else if (typeof query_string[key] === "string") {
                        query_string[key] = [query_string[key], decodeURIComponent(value)];
                    } else {
                        query_string[key].push(decodeURIComponent(value));
                    }
                }
            }
            return query_string;
        }

        function getClientIP() {
            if (clientIPstatus === '') {
                let xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        let data = xhr.response;
                        let arr = data.trim().split('\n').map(e => e.split('='))
                        let info = Object.fromEntries(arr);
                        clientIP = info['ip'];
                    }
                };
                xhr.open('GET', 'https://www.cloudflare.com/cdn-cgi/trace', true);
                xhr.setRequestHeader("Content-Type", "text/plain");
                xhr.send();
            }
            clientIPstatus = 'ready';
        }
    }
}