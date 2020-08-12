$(document).ready(function () {
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    var searchText = $("#searchField").val();

    getMovies(searchText);
  });
});

function getMovies(searchText) {
  axios.get("http://www.omdbapi.com?s='"+searchText+"&apikey=8b47da7b"+"&page=1")
    .then(function (responce) {
      console.log(responce);
      var movies = responce.data.Search;
      var error = responce.data.Error;
      var output = "";

      if(error == "Too many results.") {
        output = `
         <p class="search-results__error">Too many results.</p>
        `;
      } else if (error == "Movie not found!") {
        output = `
         <p class="search-results__error">Movie not found!</p>
        `;
      } else {
        $.each(movies, function (index, movie) {
          output += `
          <div class="search-results__item">
            <img class="search-results__poster" src="${movie.Poster}">
            <h3 class="search-results__title">${movie.Title} (${movie.Type}, ${movie.Year})</h3>
            </div>
           </div>
        `;
        });
      }

      $("#searchResults").html(output);
    })
    .catch(function (err) {
      console.log(err);
    })
}
