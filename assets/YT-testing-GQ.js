//takes ajax call and embeds video into page
var results = response.items
for (var i = 0; i < results.length; i++) {
    var videoDiv = $("<div>");
    videoDiv.append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${results[i].id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
    $("#gifs-appear-here").prepend(videoDiv);
}