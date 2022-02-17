function createElements(...elements){
    return elements.map(element => document.createElement(element));
}

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data.results
}
function getActiveUrl(page){
    let active = window.localStorage.active
    if (active === 'top') {
        return tokenTop+page
    } else if (active === 'popular') {
        return tokenPopular+page
    }
    else if (active === 'upcoming') {
        return tokenUpComing+page
    }
}