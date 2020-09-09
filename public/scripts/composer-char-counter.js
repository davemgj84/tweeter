// Implementation of character counter - event listener:

/* global document */
/* eslint-env jquery */

$(document).ready(function() {

  const $textarea = $("#tweet-text");
  $textarea.on("input", function(event) {
    const count = 140;
    let remainingChar = count - $(this).val().length;
    $(this).siblings("div").children(".counter").val(remainingChar);
    if (remainingChar < 0) {
      $(this).siblings("div").children(".counter").addClass("negative");
    } else if (remainingChar >= 0) {
      $(this).siblings("div").children(".counter").removeClass("negative");
    }
  });

});