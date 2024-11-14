import { dictLocale } from "../helpers/dictLocale.js";
import { preventInputChars } from "../helpers/helpers.js";

export default class SaleForm {
    constructor()
    {
        this.saleForms = document.querySelectorAll('[data-js-sale-form]')
    }

    init()
    {
        if(this.saleForms.length < 1) {
            return
        }

        let globalConfig = [];

        this.saleForms.forEach(form => {
            let validator = new window.JustValidate(form, globalConfig, dictLocale)

            validator.setCurrentLocale('pl')

            preventInputChars(form, '#postal-code')

            this.validate(validator)
            this.successValidation(validator, form)
        })
    }

    validate(validator)
    {

        if(!validator) {
            return
        }

        validator
            .addField('#name', [
                {
                    rule: 'required',
                    errorMessage: 'The field is required'
                },
                {
                    rule: 'customRegexp',
                    value: /^[^\d\s]+(?:\s+[^\d\s]+)+(?:\s)?$/,
                    errorMessage: 'The field should contain name and surname'
                }
            ])
            .addField('#phone', [
                {
                    rule: 'required',
                    errorMessage: 'The field is required'
                },
                {
                    rule: 'minLength',
                    value: 9,
                    errorMessage: 'Phone number should contain at least 9 digits'
                }
            ])
            .addField('#street', [
                {
                    rule: 'required',
                    errorMessage: 'The field is required'
                },
                {
                    rule: 'customRegexp',
                    value: /^(?=.*\d)(?=.*\b\w+\b.*\b\w+\b).*$/,
                    errorMessage: 'The street must contain at least two words and at least one digit'
                }
            ])
            .addField('#email', [
                {
                    rule: 'required',
                    errorMessage: 'E-mail is required'
                },
                {
                    rule: 'email',
                    errorMessage: 'Invalid e-mail',
                },
            ])
            .addField('#postal-code', [
                {
                    rule: 'required',
                    errorMessage: 'The field is required'
                },
                {
                    rule: 'minLength',
                    value: 5,
                    errorMessage: 'Postal Code should contain at least 5 characters'
                },
                {
                    rule: 'maxLength',
                    value: 6,
                    errorMessage: 'Postal Code should contain max 6 characters'
                },
            ])
            .addField('#city', [
                {
                    rule: 'required',
                    errorMessage: 'The field is required'
                },
                {
                    rule: 'minLength',
                    value: 3,
                    errorMessage: 'The field should contain at least 3 characters'
                },
                {
                    rule: 'customRegexp',
                    value: /^[^\d]*$/,
                    errorMessage: 'Numbers are not allowed in this field',
                },
            ])
    }
   
    successValidation(validator, form) {
        validator.onSuccess(( event ) => {
            this.send( event, form )
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