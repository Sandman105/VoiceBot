$.ajax({
    url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + searchTerm + "&key=AIzaSyCyd6FBuENCPG6Cky-aFkXNXCguunssJuo",
    type: "GET",
    data: { id: $(this).data("id") },
    success: function (response) {
        console.log(response);
    },
    error: function (jqXhr, status, error) {
        alert(error);
    }
});

//takes ajax call and embeds video into page
var results = response.items
for (var i = 0; i < results.length; i++) {
    var videoDiv = $("<div>");
    videoDiv.append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${results[i].id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    $("#gifs-appear-here").prepend(videoDiv);
}

// not closed