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
        console.log(dictLocale)
        const validator = new window.JustValidate(this.saleForm, globalConfig, dictLocale)

        validator.setCurrentLocale('pl')

        this.validate(validator)
    }

    validate(form)
    {
        form
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
}