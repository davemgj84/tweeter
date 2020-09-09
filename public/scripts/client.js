/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global document */
/* eslint-env jquery */

$(document).ready(function() {

  // Temp database for Users tweets
  const data = [
    {
      "user": {
        "name": "Jeffrey Lebowski",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@Dude"
      },
      "content": {
        "text": "This is a very complicated case... You know, a lotta ins, a lotta outs, lotta what-have-yous.."
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Walter Sobchak",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@Walter"
      },
      "content": {
        "text": "This is not Nam, this is bowling, there are rules.."
      },
      "created_at": 1461113959088
    }
  ];

  // Creates a tweet element with a tweet template using template literals to pull data from user objects:
  const createTweetElement = function(data) {
    const tweetTemplate = `<article class="tweet" >
      <header>
        <span class="avatar-and-name">
          <img src=${data.user.avatars} /> ${data.user.name}
          </span>
        <span class="username">
          ${data.user.handle}
          </span>
      </header>
      <div class="message">
        <p>${data.content.text}</p>
      </div>
      <footer>
        <span class="date">${moment(data.created_at).fromNow()}</span>
        <span class="likes">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article >`;
    return tweetTemplate;
  };

  // renders the tweets by looping through the user tweet database and creates a tweet element for each tweet,
  // the prepends them to the appropriate section.
  const renderTweets = function(data) {
    // loops through tweets
    for (const id of data) {
      const $tweet = createTweetElement(id);
      $('#tweets').prepend($tweet);
    }
  };

  renderTweets(data);

});