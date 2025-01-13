export default class PrivacySettingsButton
{
    constructor()
    {
        this.privacyTrigger = document.querySelector('.privacy-trigger')
    } 

    init()
    {
        if(!this.privacyTrigger) {
            return 
        }

        this.privacyTrigger.addEventListener('click', (e) => {
            e.preventDefault()

            if(document.body.querySelector('#CookiebotWidget')) {
                document.body.querySelector('#CookiebotWidget').classList.toggle('active')

               this.cookiebotOpen()
            }
        })  

        document.body.addEventListener('click', function(event){
            if (event.target.classList.contains('CookiebotWidget-close') || event.target.closest('.CookiebotWidget-close')) {
                setTimeout(() => {
                    if(document.body.querySelector('#CookiebotWidget').classList.contains('active')) {
                        document.body.querySelector('#CookiebotWidget').classList.remove('active')
                    }
                }, 200) 
            }
        }) 
    }
 
    cookiebotOpen()
    {
        document.body.querySelector('.CookiebotWidget-logo').click()
    }
}