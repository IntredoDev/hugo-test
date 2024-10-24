import { dictLocale } from "../helpers/dictLocale.js";
import { redirectTo } from "../helpers/helpers.js";

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
        // this.send(validator)
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
   
    send(validator) {
        validator.onSuccess(( event ) => {
            redirectTo('thank-you')
        });
    }
}