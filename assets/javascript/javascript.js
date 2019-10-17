// OPEN MODAL
function openNav() {
    document.getElementById("modal").style.width = "100%";
}

// CLOSE MODAL
function closeNav() {
    document.getElementById("modal").style.width = "0%";
}

// RESET
function locationReload() {
  location.reload();
}

// ANIMATE BUTTON
$("#start_button").on("click", function() {
    $(this)
    .velocity({ translateY: "-30px", rotateZ: "10deg" }, 100, "easeOut")
    .velocity({ rotateZ: "-8deg" }, 150)
    .velocity({ translateY: "0", rotateZ: "0" }, {duration: 600, easing: [ 500, 14 ]});
});

// BRANCH VOICE TO SEPARATE APIs
function evaluateText() {
    var finalText = document.getElementById("final_span").innerHTML;
    var interimText = document.getElementById("interim_span").innerHTML; console.log(interimText.toString());
    interimText = finalText;
    if (interimText.indexOf('movie') >= 0 || interimText.indexOf('Movie') >= 0) {
        searchMovieDatabase(interimText); console.log("searching movie base for string",interimText);
    } else {
        searchYouTube(interimText); console.log("searching YouTube for string",interimText);
    }
}

// YOUTUBE GET
function searchYouTube(interimText) {

    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + interimText + "&key=AIzaSyCyd6FBuENCPG6Cky-aFkXNXCguunssJuo",
        type: "GET",
        data: { id: $(this).data("id") },
        success: function (response) {
            responseYouTube(response);
        },
        error: function (jqXhr, status, error) {
            alert(error);
        }
    });
}

// YOUTUBE RESPONSE
function responseYouTube(response) {
    var results = response.items
    for (var i = 0; i < results.length; i++) {
        var videoDiv = $("<div>");
        videoDiv.append(`<iframe width="100%" max-width="560" max-height="315" src="https://www.youtube.com/embed/${results[i].id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
        $("#youTubeImages").prepend(videoDiv);
    }
    openNav();
document.getElementById("results").innerHTML = '<span id="final_span" class="final"></span><span id="interim_span" class="interim"></span><p>';
}

// MOVIE DATABASE GET
function searchMovieDatabase(movie) {
    // var movie = ... pass voice search request here
    document.getElementById("results").innerHTML = '<span id="final_span" class="final"></span><span id="interim_span" class="interim"></span><p>';
    var splitMovieString;
    if (movie.indexOf("movies") >= 0) {
        splitMovieString = movie.split("movies")[1].split(" ").join("%20"); console.log(splitMovieString);
    } else {
        splitMovieString = movie.split("movie")[1].split(" ").join("%20"); console.log(splitMovieString);
    }
    var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=e10fa0b146653df2fed8a2eebf2fb01c&query=" + splitMovieString;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .then(function(response) {
        console.log(queryURL);
        //console.log(response);
        console.log(response.results);
        responseMovieDatabase(response.results);
    });
}

// MOVIE DATABASE RESPONSE
function responseMovieDatabase(movieResults) {

    //var movieResults = response.results;

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
    openNav();
    document.getElementById("results").innerHTML = '<span id="final_span" class="final"></span><span id="interim_span" class="interim"></span><p>';
};

// SPEECH TO TEXT
var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];
for (var i = 0; i < langs.length; i++) {
  select_language.options[i] = new Option(langs[i][0], i);
}
select_language.selectedIndex = 6;
updateCountry();
select_dialect.selectedIndex = 6;
showInfo('info_start');
function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}
var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
//   start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onstart = function() {
    recognizing = true;
    showInfo('info_speak_now');
    //start_img.src = 'mic-animate.gif';
  };
  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      //start_img.src = 'mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      //start_img.src = 'mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };
  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    //start_img.src = 'mic.gif';
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
    if (create_email) {
      create_email = false;
      createEmail();
    }
  };
  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
  };
}
function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
// function createEmail() {
//   var n = final_transcript.indexOf('\n');
//   if (n < 0 || n >= 80) {
//     n = 40 + final_transcript.substring(40).indexOf(' ');
//   }
//   var subject = encodeURI(final_transcript.substring(0, n));
//   var body = encodeURI(final_transcript.substring(n + 1));
//   window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
// }
// function copyButton() {
//   if (recognizing) {
//     recognizing = false;
//     recognition.stop();
//   }
//   copy_button.style.display = 'none';
//   copy_info.style.display = 'inline-block';
//   showInfo('');
// }

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    evaluateText();
    return;
  }
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  //start_img.src = '';
  //showInfo('info_allow');
  showButtons('none');
  start_timestamp = event.timeStamp;
}
function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}
var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
  //copy_button.style.display = style;
  //email_button.style.display = style;
  //copy_info.style.display = 'none';
  //email_info.style.display = 'none';
}
