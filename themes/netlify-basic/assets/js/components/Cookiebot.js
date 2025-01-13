export default class Cookiebot {
    constructor()
    {
 
    }

    async init()
    {
        setTimeout(function() {
            const script = document.createElement('script');
            script.id = "Cookiebot";
            script.src = "https://consent.cookiebot.com/uc.js";
            script.setAttribute('data-cbid', 'db0ddc87-b4ec-475d-bc0d-551dc9ce5e82');
            script.setAttribute('data-blockingmode', 'auto');
            script.type = "text/javascript";
            script.async = true;
            document.head.appendChild(script);
        }, 3000);
    }
}