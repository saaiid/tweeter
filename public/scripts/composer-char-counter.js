console.log('This is new js file')

$(document).ready(function() {
 /*  console.log($('#tweet-text')) */
  // --- our code goes here ---
  $('#tweet-text').on('input', function() {
    /* console.log(140 - this.value.length); */
    let count = 140 - this.value.length;

    if (count < 0) {
      $(".counter").addClass("error");
    } else {
      $(".counter").removeClass("error");
 
    }
    $(".counter").text(count)
  });
});