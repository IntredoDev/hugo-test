export function scrollTo(target, behavior)
{
    target.scrollIntoView({ behavior: behavior });
}

export function redirectTo(url)
{
    if(!url) {
        return
    }

    const origin = window.location.origin;
    
    window.location = `${origin}/${url}`
}

export function preventInputChars(form, selector)
{
    const input = form.querySelector(selector)

    if(!input) {
     return 
    }

    input.addEventListener('input', function (event) {
         this.value = this.value.replace(/[^0-9-]+/g, '');
    });
}