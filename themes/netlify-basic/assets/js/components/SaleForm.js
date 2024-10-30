import { dictLocale } from "../helpers/dictLocale.js";

export default class SaleForm {
    constructor()
    {
        this.saleForm = document.getElementById('form-sale')
    }

    init()
    {
        if(!this.saleForm) {
            return
        }

        let globalConfig = [];
        let validator = new window.JustValidate(this.saleForm, globalConfig, dictLocale)

        validator.setCurrentLocale('pl')

        this.validate(validator)
        this.successValidation(validator)
    }

    validate(validator)
    {
        if(!validator) {
            return
        }

        validator
            .addField('#name', [
                {
                    rule: 'required'
                }
            ])
            .addField('#street', [
                {
                    rule: 'required'
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
    }
   
    successValidation(validator) {
        validator.onSuccess(( event ) => {
            console.log('success')
            this.send( event )
        });
    }

    send(event)
    {
        event.preventDefault();

        let data = null;
        let clientIPstatus = '';
        let codBoolean = true;
        let clientIP = getClientIP();
        let formType = document.forms[0].id

        let customerPrefix = document.getElementsByName('customerPrefix')[0];

        let shortLead = document.getElementsByName('shortLead')[0];

        let customerPhone = document.getElementsByName('phone')[0];
        let customerFullName = document.getElementsByName('name')[0];
        let customerEmail = document.getElementsByName('email')[0];

        let customerAddress = document.getElementsByName('street')[0];
        let customerCity = document.getElementsByName('city')[0];
        let customerPostcode = document.getElementsByName('postal-code')[0];
        let customerCountryCode = document.getElementsByName('country')[0];
        let cashOnDelivery = document.getElementsByName('cashOnDelivery')[0];

        let redirect = document.getElementsByName('redirect')[0];
        let pageAction = document.getElementsByName('action')[0];
        let offerId = document.getElementsByName('offerId')[0];
        let button = document.getElementById('submit');


        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

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

                            console.log(window.location.href)
                        }
                    }
                }
            }
        });

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

        console.log('valid')

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

        document.forms[0].addEventListener("input", function () {
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