$(document).ready(function () {
  bindClickHandler();
});

function bindClickHandler() {
  $('#javascript-submit').on('click', function () {
    var input_message = $('#message').val();
    $.post('/api/receiver', {"message": input_message}, function (data) {
      $('#target-area').html(nunjucks.render('form.html', {'templating_language':"nunjucks"}));
      $('#target-area').append(nunjucks.render('message.html', {'templating_language':"nunjucks", 'template_message': data.template_message}));
      bindClickHandler();
    });
  });
}
