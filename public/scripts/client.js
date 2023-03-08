/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  ///--------> Prevents cross-site scripting <--------///
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /// Returns html element from given object data
  const createTweetElement = function (tweetObj) {
    const $tweet = $("<article>").addClass("tweet");

    const html = `
          <header>
            <img src= ${tweetObj.user.avatars}>
            <h4>${tweetObj.user.name}</h4>
            <p>${tweetObj.user.handle}</p>
          </header>
          <p>${escape(tweetObj.content.text)}</p>
          <footer>
            <p>${timeago.format(tweetObj.created_at)}</p>
            <div>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
              <i class="far fa-heart"></i>
            </div>
          </footer>`;

    $tweet.append(html);
    return $tweet;
  };

  // renders tweets by looping through array
  const renderTweets = function (tweetArr) {
    $(".tweet-container").empty()
    for (const tweet of tweetArr) {
      const $tweet = createTweetElement(tweet);
      $(".tweet-container").prepend($tweet);
    }
  };

  // loads tweets from JSON
  const loadTweets = function () {
    $.ajax("/tweets", { method: "GET" }).then(function (allTweets) {
      renderTweets(allTweets);
    });
  };
  loadTweets();

  // request to submit new tweets
  $("#submit-form").submit(function (event) {
    event.preventDefault();

    const newTweetText = $(this).find("textarea").val();

    if (!newTweetText) {
      $("#noText").slideDown("slow");
      setTimeout(() => {
        $("#noText").slideUp("slow");
      }, 2500);
    } else if (newTweetText.length > 140) {
      $("#tooLong").slideDown("slow");
      setTimeout(() => {
        $("#tooLong").slideUp("slow");
      }, 2500);
    } else {
      const textStr = $("#submit-form").serialize();
      $.post("/tweets/", textStr, function () {
        loadTweets();
      });

      // empties text area after submission and counter goes back to 140
      $("textarea").val("");
      $(".counter").text("140");
    }
  });

  // hides or shows text area when button in header is clicked
  $("#compose-new button").click(function () {
    $(".new-tweet").slideToggle("slow");
    $(".new-tweet textarea").focus();
  });
});


