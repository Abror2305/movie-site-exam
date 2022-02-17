// let API_KEY = 'b971c2f0de8767f08d2bb84160ba24b7'
// APIs
let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let tokenTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1` 
let tokenPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`
let tokenUpComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`

//DOM elements
const movieList = document.querySelector('.append')

function renderMovie(data) {
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



let a = fetch(tokenTop).then(data => data.json()).then(data => renderMovie(data.results))