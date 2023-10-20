const searchBtn = document.querySelector(".search-btn");
const searchMovieInput = document.querySelector(".search-movie-input");
const searchResultEl = document.querySelector(".search-results");
const addToWatchlistBtn = document.querySelector(".add-to-watchlist");
const removeFromWatchlistBtn = document.querySelector(".remove-from-watchlist");

let addToWatchList = [];
let movieId = "";
let searchResultMovieArr = [];

searchBtn.addEventListener("click", async () => {
 /* let searchResultMovieArr = [];*/
  const adjustedInput = searchMovieInput.value
  .toLowerCase()
  .trim()
  .replace(/\s+/g, "+")
  .split(" ");
  const resp = await fetch(
    `https://www.omdbapi.com/?s=${adjustedInput}&type=movie&apikey=41912cb`
    );
    const dataD = await resp.json();
    
    const movieArr = dataD.Search;
   searchResultEl.innerHTML = "";

  movieArr.forEach(async (item) => {
    const resp = await fetch(
      `https://www.omdbapi.com/?i=${item.imdbID}&apikey=41912cb`
    );
    const data = await resp.json();
    const trimGenre = data.Genre.split(",").slice(0, 3).join(",");
    searchResultMovieArr.push(data);

    searchResultEl.insertAdjacentHTML(
      "beforeend",
      `
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
        <p class="movie-info">
        <span>${data.Runtime}</span>
         ${trimGenre} 
        <button class="add-to-watchlist" data-add="${data.imdbID}">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-circle-plus add-to-watchlist"
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
        <button class="remove-from-watchlist" data-remove="${data.imdbID}">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
        <path d="M9 12l6 0"></path>
        </svg>
        Remove
        </button>
        </p>
        <p class="plot">
          ${data.Plot}
        </p>
      </div>`
    );
  });



});

searchResultEl.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    e.target.style.display = "none"
    e.target.nextElementSibling.style.display= "flex"
    addMovieToWatchList(e.target.dataset.add, searchResultMovieArr)
    console.log(addToWatchList)
  }
  sendDataToLocalStorage(addToWatchList);

  if(e.target.dataset.remove){
    e.target.style.display = "none"
    e.target.previousElementSibling.style.display= "flex"

    // removeMovieFromWatchList(e.target.dataset.remove, addToWatchList)
    // removeItemFromLocalStorage(e.target.dataset.remove)

  }

});

function addMovieToWatchList(id, array) {
  addToWatchList.push(
    array.filter((item) => item.imdbID == id)
  );
}




// function removeMovieFromWatchList (id, array) {
  
//   const index = array.indexOf();
//   console.log(index)
//   const x = array.splice(index,1);
//   console.log(array)
// }

function sendDataToLocalStorage(array) {
  localStorage.setItem("addedMovies", JSON.stringify(array));
}

// function removeItemFromLocalStorage (id){
//   const arrayFromLocalStorage = JSON.parse(localStorage.getItem("addedMovies"))
//   arrayFromLocalStorage.splice(arrayFromLocalStorage.indexOf(arrayFromLocalStorage.filter((item)=> item.imdbID == id)), 1)
//   localStorage.setItem("addedMovies",JSON.stringify(arrayFromLocalStorage));
// } 

