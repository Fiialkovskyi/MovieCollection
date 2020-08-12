var page = 1;

$(document).ready(function () {
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    var searchText = $("#searchField").val();
    page = 1;
    getMovies(searchText);
  });
});



function getMovies(searchText) {
  axios.get("http://www.omdbapi.com?s='"+searchText+"&apikey=8b47da7b"+"&page=" + page)
    .then(function (responce) {
      console.log(responce);
      var movies = responce.data.Search;
      var error = responce.data.Error;
      var totalResults = responce.data.totalResults;
      var postsPerPage = 10;
      var pageCount = Math.ceil(totalResults / postsPerPage);
      var output = "";
      var paginationOutput = "";

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

        if (totalResults > 10) {
          $(".search-pagination").addClass("search-pagination--show");
        }

        $("#pagination-next").click(function (event) {
          event.preventDefault();
          if (page < pageCount) {
            page++;
          }
          getMovies(searchText);
        });

        $("#pagination-prev").click(function (event) {
          event.preventDefault();
          if(page > 1) {
            page--;
          }
          getMovies(searchText);
        });

        paginationOutput = `
          <p>${postsPerPage * (page - 1)} - ${postsPerPage * page} of ${totalResults}</p>
        `;
      }

      $("#searchResults").html(output);
      $("#pagination").html(paginationOutput);
    })
    .catch(function (err) {
      console.log(err);
    })
}


