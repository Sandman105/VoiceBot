function searchYouTube() {
// calls youtube api
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + searchTerm + "&key=AIzaSyCyd6FBuENCPG6Cky-aFkXNXCguunssJuo",
        type: "GET",
        data: { id: $(this).data("id") },
        success: function (response) {
            console.log(response);
            responseYouTube(response);
        },
        error: function (jqXhr, status, error) {
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
        $("#gifs-appear-here").prepend(videoDiv);
    }
}


$("#speakButton").mousedown(function(){
	$(this)
		.velocity({ translateY: "-30px", rotateZ: "10deg" }, 100, "easeOut")
		.velocity({ rotateZ: "-8deg" }, 150)
		.velocity({ translateY: "0", rotateZ: "0" }, {duration: 600, easing: [ 500, 14 ]});
});