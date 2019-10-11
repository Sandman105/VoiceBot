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