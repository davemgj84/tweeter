/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* global document */
/* eslint-env jquery */

$(document).ready(function() {

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
    $.post('/tweets', serializedData)
      .then(() => {
        loadtweets();
        $(this).children('textarea').val('');
        $('.counter').val(140);
        $('.counter').removeClass('negative');
      });
  });

});