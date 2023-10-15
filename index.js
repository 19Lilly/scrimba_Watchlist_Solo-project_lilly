const searchBtn = document.querySelector('.search-btn')
const searchMovieInput = document.querySelector('.search-movie-input')
const searchResultEl = document.querySelector('.search-results')

searchBtn.addEventListener('click', async() => {
    const adjustedInput = searchMovieInput.value.toLowerCase().trim().replace(/\s+/g, '+').split(' ')
    const resp = await fetch(`http://www.omdbapi.com/?s=${adjustedInput}&type=movie&apikey=41912cb`)
    const data = await resp.json()

    console.log(data)

    const movieArr = data.Search
    searchResultEl.innerHTML = ''

    movieArr.forEach(async (item) => {
        const resp = await fetch(`http://www.omdbapi.com/?i=${item.imdbID}&apikey=41912cb`)
        const data = await resp.json()

        const trimGenre = data.Genre.split(',').slice(0,3).join(',')
     
        
        searchResultEl.insertAdjacentHTML("beforeend", `
        <div class="movie-card">
        <img
          class="movie-img"
          src="${data.Poster}"
          alt="poster of this movie"
        />
        <h2 class="movie-title">
          ${data.Title}
          <span class="rating">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-star-filled"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"
                stroke-width="0"
                fill="currentColor"
              ></path>
            </svg>
            ${data.imdbRating}
          </span>
        </h2>
        <p class="movie-info"><span>${data.Runtime}</span> ${trimGenre}
        <button class="btn add-to-watchlist">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-circle-plus"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
            <path d="M9 12h6"></path>
            <path d="M12 9v6"></path>
          </svg>
          Watchlist
        </button>
        </p>
        <p class="plot">
          ${data.Plot}
        </p>
      </div>`)     

    })


})
