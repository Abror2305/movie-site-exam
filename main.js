// let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'

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

// render movie
function renderMovie(data) {
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
        let active = window.localStorage.active
        page--
        pagNum.innerText = page
        if (active === 'top') {
            renderMovie(await getData(tokenTop+page))
        } else if (active === 'popular') {
            renderMovie(await getData(tokenPopular+page))
        }
        else if (active === 'upcoming') {
            renderMovie(await getData(tokenUpComing+page))
        }
    }
}
next.onclick = async () => {
    let active = window.localStorage.active
    ++page
    pagNum.innerText = page
    if (active === 'top') {
        renderMovie(await getData(tokenTop+page))
    } else if (active === 'popular') {
        renderMovie(await getData(tokenPopular+page))
    }
    else if (active === 'upcoming') {
        renderMovie(await getData(tokenUpComing+page))
    }
}
function filter(){}


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