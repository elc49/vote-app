(function () {

  $('.outer').css('border-radius', 0);
  $('.lead').css({
    'font-size': '3.5rem',
    'font-family': 'Ubuntu',
    'font-weight': 200,
    'margin-top': '3rem'
  });
  $('.twitter').css({
    'font-size': '1.50rem'
  });
  $('.tagline').css({
    'font-size': '2rem'
  });
  $('.marginable').css({
    'font-size': '4rem',
    'color': 'green',
    'margin-top': '3rem'
  });

  $('.marginable').transition({
    animation: 'jiggle',
    duration: '1s',
    onComplete: function () {
      $(this).transition('fade');
    }
  });

  $('.ui.dropdown').dropdown();

  $('form').css({
    'width': '50rem',
    'margin-top': '3rem'
  });

  $('.label').css({
    'font-family': 'Ubuntu',
    'font-weight': 300,
    'font-size': '2rem'
  });

  $('.add').hide();
  
  $('.display-form').click(function () {
    $('.add').show();
    $('.display-form').hide();
  });

  $('.message .close').on('click', function () {
    $(this).closest('.message').transition('fade');
  });

  $('.delete').on('click', function () {
    $('.ui.basic.modal').modal('show');
  });


})();