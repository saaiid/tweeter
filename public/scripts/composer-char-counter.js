console.log('This is new js file')

$(document).ready(function() {
 
  //form submition
  $('.newtweet-container').submit(function(event) {
     event.preventDefault();

     const $form = $(this);
     const $input = $form.find('form-textarea');

     //validate tweet
     if (!isTweetValid($input)) {
      return false;
     }

     const data = $form.serialize();
     $.post('/tweets', data)
     .then(() => {
        $input.val('')
        $('.counter').html(140);
        loadTweets();
     })

     //submit ajax request
   /*   $.ajax({
      url: '/tweets',
      type: 'post',
      data: data
     }).done(function(data) {
      $input.val('');
      $('.counter').html(140);
      loadTweets();
     }) */
  });

  return true;

});