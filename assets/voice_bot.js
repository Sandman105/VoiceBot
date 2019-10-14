const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');

//Now we are making some more constants, variables to hold the names of our intents, the action.
//The name of the variable(constant) should match the intent string that was created.
const WELCOME_INTENT = "Default Welcome Intent";
const FALLBACK_INTENT = "Default Fallback Intent";
const NEW_MOVIE_RELEASE = "SearchNewMovieReleaseVideos";
//
const MOVIE_TYPE_ENTITY = "TypeOfMovie";

//Now are creating a constant(variable) called app which is going to hold a diaglogFlow object.
//We are going to add things to this dialogFlow object, we're going to add our responses in. That way,
//our dialogFlow agent knows what to say to the users.
const app = dialogflow();

//So we are going to plug in the response for the WELCOME INTENT, so when the user opens our bot, what do they see. And then we are going to create a function inside of app.intent. So when the WELCOME_INTENT is triggered, what do we want you to do, well what we want you to do is, when the WELCOME_INTENT is called, provide this response. We asking the user to ask to see movie trailers. We do the same with our FALLBACK_INTENT and NEW_MOVIE_RElEASE intent.
app.intent(WELCOME_INTENT, (conv) => {
    conv.ask("Welcome to Search New Movie Trailer! Ask to see new movie trailers")
});

app.intent(FALLBACK_INTENT, (conv) => {
    conv.ask("I didn't understand your request")
});

app.intent(NEW_MOVIE_RELEASE, (conv) => {
    //Below we are storing the type of movie user is asking for and the (conv) variable holds our request object.
  	//And we can go into that request object and get certain informaion about it, like what is in the parameters and we can grab MOVIE_TYPE-ENTITY. MOVIE_TYPE_ENTITY might need hard bracks for an array if I make further changes.
      const movie_type = conv.parameters(MOVIE_TYPE_ENTITY).toLowerCase();
      if (movie_type === "new movie trailer") {
        //This conv.ask type seems to be the spot where we'd ask YouTube to pull a new movie trailer, so need to figure how do we link that.
        conv.ask("Here is your movie trailer");
      //Just put in something for the else statement for now, will need more movie types of video types created. Just used movie trailer for now. I can have an else if for horror movie type, or else if drame movie type. Or whatever the group decides.  We are customizing the response based on what the user said.
      } else {
        conv.ask("Here's another trailer");
      }
    conv.ask("Here is your movie trailer");
});

//Last thing is we need to send the app object back as the Fulfillment.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);