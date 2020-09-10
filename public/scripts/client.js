/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global document */
/* eslint-env jquery */

$(document).ready(function() {

  //Hides error box for new tweets upon page load:
  $(".error-message").hide();

  // Variables for my error messages in new tweets - needed to make variables to make it cleaner below with icons:
  const errorBoxHtmlOne = `
  <i class="fas fa-exclamation-circle"></i> 
  &nbsp;&nbsp; Please Enter a Message to Tweet &nbsp;&nbsp; 
  <i class="fas fa-exclamation-circle"></i>`;
  const errorBoxHtmlTwo = `
  <i class="fas fa-exclamation-circle"></i> 
  &nbsp;&nbsp; Your tweet is too long - Make sure your tweet is under 140 characters &nbsp;&nbsp; 
  <i class="fas fa-exclamation-circle"></i>`;

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
    const errorBox = $(".error-message");
    const serializedData = $(this).serialize();
    const characters = $("#tweet-text").val();
    if (characters.length === 0 || characters === null || characters === "") {
      errorBox.html(errorBoxHtmlOne).slideDown(2000).slideUp(1000);
    } else if (characters.length > 140) {
      errorBox.html(errorBoxHtmlTwo).slideDown(2000).slideUp(1000);
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
