/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global document */
/* eslint-env jquery */

$(document).ready(function() {

  // ESCAPE FUNCTION to stop malicious activity being passed into the tweet:
  const escape = (string) => {
    const regex = /[&<>"'/]/ig;
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "/": "&#x2F;"
    };
    return string.replace(regex, match => map[match]);
  };

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
        <p>${escape(data.content.text)}</p>
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
    $('#tweets').empty();
    for (const id of data) {
      const $tweet = createTweetElement(id);
      $('#tweets').prepend($tweet);
    }
  };

  // AJAX GET REQ HANDLING:
  const loadtweets = () => {
    $.get('/tweets', null, (posts) => {
      renderTweets(posts);
    });
  };

  // AJAX POST REQ HANDLING:
  const $postForm = $('#submit-form');

  $postForm.on('submit', function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    const characters = $("#tweet-text").val();
    if (characters.length === 0 || characters === null || characters === "") {
      alert("Please enter a message to Tweet");
    } else if (characters.length > 140) {
      alert("There is a 140 character limit");
    } else {
      $.post('/tweets', serializedData)
        .then(() => {
          $(this).children('textarea').val('');
          $('.counter').val(140);
          $('.counter').removeClass('negative'); //redundant;
          loadtweets();
        });
    }
  });

  loadtweets();
});
