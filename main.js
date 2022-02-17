let page = 1
// APIs
let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=`
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=`
let defaultActive = window.localStorage.active || 'top'

//DOM elements
const movieList = document.querySelector('.append')
const [topMovie,popular,upcoming] = document.querySelectorAll('.btns')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const pagNum = document.querySelector('.title')
const searchBtn = document.querySelector('.btn')
const search = document.querySelector('#search')
const min = document.querySelector('#min')
const max = document.querySelector('#max')
const score = document.querySelector('#score')

// render movie
function renderMovie(data) {
    console.log(data);
    movieList.innerHTML = ''
    for (const el of data) {
        let [movie,img,movieInfo,h3,rate,date] = createElements("div","img","div","h3","span","span")

        movie.classList.add("movie")
        img.src = "https://image.tmdb.org/t/p/w500"+el.poster_path
        img.alt = el.title
        movieInfo.classList.add("movie-info")
        h3.innerText = el.title
        rate.classList.add("orange")
        rate.innerText = el.vote_average
        date.classList.add("date")
        date.innerText = el.release_date

        movie.append(img)

        movieInfo.append(h3,rate)
        movie.append(movieInfo,date)
        movieList.append(movie)
    }
    
}

// active buttons
topMovie.onclick = async () => {
    page = 1
    pagNum.innerText = page
    let response =await getData(tokenTop+page)
    renderMovie(response)
    window.localStorage.active = 'top'
}
popular.onclick = async () => {
    page = 1
    pagNum.innerText = page
    let response =await getData(tokenPopular+page)
    renderMovie(response)
    window.localStorage.active = 'popular'
}
upcoming.onclick = async () => {
    page = 1
    pagNum.innerText = page
    let response =await getData(tokenUpComing+page)
    renderMovie(response)
    window.localStorage.active = 'upcoming'
}

// pagination
prev.onclick = async () => {
    if(page > 1) {
        page--
        pagNum.innerText = page
        renderMovie(await getData(getActiveUrl(page)))
    }
}
next.onclick = async () => {
    ++page
    pagNum.innerText = page
    renderMovie(await getData(getActiveUrl(page)))
}

// filter button click
async function filter(search,minDate,maxDate,score,data){
    let filtered = data.filter(el => {
        return el.title.toLowerCase().includes(search.toLowerCase()) &&
        +el.release_date.match(/^\d+/g)[0] >= minDate && 
        +el.release_date.match(/^\d+/g)[0] <= maxDate && 
        el.vote_average >= score
    })
    renderMovie(filtered)
}


// Search button click
searchBtn.addEventListener("click",async ()=> {
    let searchName = search.value ? search.value : ''
    let minScore = +min.value
    let maxScore = max.value ? +max.value : 3000
    let scoreValue = score.value ? +score.value : 0
    let data = await getData(getActiveUrl(page))
    filter(searchName,minScore,maxScore,scoreValue, data)
    search.value = ''
    min.value = ''
    max.value = ''
    score.value = ''
})

// default active button
switch (defaultActive) {
    case 'popular':
        popular.click()
        break;
    case 'top':
        topMovie.click()
        break;
    case 'upcoming':
        upcoming.click()
        break;
    default:
        topMovie.click()
}