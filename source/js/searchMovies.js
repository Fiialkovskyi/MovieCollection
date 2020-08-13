"use strict";

var page = 1;
var pageCount = 0;
$(document).ready(function () {
  var  searchText;
  $("#searchForm").submit(function (event) {
    event.preventDefault();
    searchText = $("#searchField").val();
    page = 1;
    getMovies(searchText);
  });
  $("#pagination-next").click(function (event) {
    event.preventDefault();

    if (page < pageCount) {
      page++;
    }

    getMovies(searchText);
  });
  $("#pagination-prev").click(function (event) {
    event.preventDefault();

    if (page > 1) {
      page--;
    }

    getMovies(searchText);
  });
});

function getMovies(searchText) {
  jQuery.get("http://www.omdbapi.com?s='"+searchText+"&apikey=8b47da7b"+"&page="+page, function (responce) {
    console.log(responce);
    if(responce) {
      var movies = responce.Search;
      var error = responce.Error;
      var totalResults = responce.totalResults;
      var postsPerPage = 10;
      pageCount = Math.ceil(totalResults / postsPerPage);
      var output = "";
      var paginationOutput = "";

      if (error == "Too many results.") {
        output = "\n         <p class=\"search-results__error\">Too many results.</p>\n        ";
      } else if (error == "Movie not found!") {
        output = "\n         <p class=\"search-results__error\">Movie not found!</p>\n        ";
      } else {
        $.each(movies, function (index, movie) {
          output += "\n          <div class=\"search-results__item\">\n            <img class=\"search-results__poster\" src=\"".concat(movie.Poster, "\">\n            <h3 class=\"search-results__title\">").concat(movie.Title, " (").concat(movie.Type, ", ").concat(movie.Year, ")</h3>\n            </div>\n           </div>\n        ");
        });

        if (totalResults > 10) {
          $(".search-pagination").addClass("search-pagination--show");
        }

        paginationOutput = "\n          <p>".concat(postsPerPage * (page - 1), " - ").concat(postsPerPage * page, " of ").concat(totalResults, "</p>\n        ");
      }

      $("#searchResults").html(output);
      $("#pagination").html(paginationOutput);
    }
  });

}
