const api = "https://www.omdbapi.com/";
const apiKey = "e85267e5";

const movieContainer = document.querySelector(".movie-container");

let movieTitle;

const btnSearch = document.querySelector(".btn-search");

const btnReset = document.querySelector(".btn-reset");

const statusEle = document.querySelector(".status");

const getMovieData = async function (movieTitle) {
  try {
    const response = await fetch(`${api}?t=${movieTitle}&apikey=${apiKey}`);
    const data = await response.json();
    console.log(data.Response);
    if (data.Response === "True") {
      movieContainer.classList.remove("block");
      displayMovieDetails(data);
    } else {
      movieContainer.classList.add("block");
      movieContainer.insertAdjacentHTML(
        "beforeend",
        `<p class="status">Movie Not Found</p>`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

function displayMovieDetails(data) {
  movieContainer.innerHTML = `
  <section class="movie-rating">
    <div class="img-container">
      <img
        src=${data.Poster}
        alt="${data.Title}"
        class="movie-img"
      />
    </div>
    <div class="rating-container">
      <p class="res-provider">
        <img
          src="img/half rating star.svg"
          alt="rating"
          width="25px"
        /><strong>IMDB: </strong>
      </p>
      <p class="res-rating"><strong>${
        data.Ratings[0]?.Value || "NA"
      }</strong></p>
      <p class="res-provider">
        <img src="img/half rating star.svg" alt="rating" width="25px" />
        <strong>Rotten Tomatoes: </strong>
      </p>
      <p class="res-rating"><strong>${
        data.Ratings[1]?.Value || "NA"
      }</strong></p>
      <p class="res-provider">
        <img
          src="img/half rating star.svg"
          alt="rating"
          width="25px"
        /><strong>Metacritic: </strong>
      </p>
      <p class="res-rating"><strong>${data.Ratings[2]?.Value || "NA"}
      </strong></p>
    </div>
  </section>
  <section class="movie-data">
    <p class="res-title">
      <strong>Title: </strong>${data.Title}
    </p>
    <p class="res-year"><strong>Year: </strong>${data.Year}</p>
    <p class="res-date"><strong>Released Date: </strong>${data.Released}</p>
    <p class="res-runtime"><strong>Runtime: </strong>${data.Runtime}</p>
    <p class="res-genre">
      <strong>Genre: </strong>${data.Genre}
    </p>
    <p class="res-director"><strong>Director: </strong>${data.Director}</p>
    <p class="res-actors">
      <strong>Actors: </strong>${data.Actors}
    </p>
    <p class="res-lang"><strong>Language: </strong>${data.Language}</p>
    <p class="res-country"><strong>Country: </strong>${data.Country}</p>
  </section>`;
}

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  movieContainer.innerHTML = "";
  const inputEle = document.querySelector(".input-movie");
  movieTitle = inputEle.value;
  getMovieData(movieTitle);
});
