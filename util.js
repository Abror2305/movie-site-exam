function createElements(...elements){
    return elements.map(element => document.createElement(element));
}

async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data.results
}