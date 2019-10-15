$("#speakButton").on("click", function() {
    document.getElementById("myNav").style.width = "100%";
})


function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

function searchYouTube() {
    // calls youtube api
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + searchTerm + "&key=AIzaSyCyd6FBuENCPG6Cky-aFkXNXCguunssJuo",
        type: "GET",
        data: { id: $(this).data("id") },
        success: function(response) {
            console.log(response);
            responseYouTube(response);
        },
        error: function(jqXhr, status, error) {
            alert(error);
        }
    });
}

function responseYouTube(response) {
    //takes ajax call and embeds video into page
    var results = response.items
    for (var i = 0; i < results.length; i++) {
        var videoDiv = $("<div>");
        videoDiv.append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${results[i].id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        $("#youTubeImages").prepend(videoDiv);
    }
}

function searchMovieDatabase() {
    // var movie = ... pass voice search request here

    var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=e10fa0b146653df2fed8a2eebf2fb01c&query=" + movie;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        console.log(queryURL);
        console.log(response);

    });
}

function responseMovieDatabase() {


    var movieResults = response.results;

    for (var i = 0; i < 5; i++) {
        var movieDiv = $("<div>");
        var movieTitle = $("<h1>");
        var moviePoster = $("<img>");
        movieTitle.text(movieResults[i].title);
        var movieInfo = $("<p>").text(movieResults[i].overview);
        var movieDate = $("<p>").text("Released: " + movieResults[i].release_date);
        movieDiv.append(movieTitle);
        movieDiv.append(movieInfo);
        movieDiv.append(movieDate);
        $("#movie-info-here").append(movieDiv);
        $("#movie-info-here").append("<img src='https://image.tmdb.org/t/p/w200/" + movieResults[i].poster_path + "'>'");
    }
};

$("#speakButton").mousedown(function() {
    $(this)
        .velocity({ translateY: "-30px", rotateZ: "10deg" }, 100, "easeOut")
        .velocity({ rotateZ: "-8deg" }, 150)
        .velocity({ translateY: "0", rotateZ: "0" }, { duration: 600, easing: [500, 14] });
});