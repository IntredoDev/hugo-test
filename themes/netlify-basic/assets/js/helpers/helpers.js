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