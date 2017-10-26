(function () {

  $('.outer').css('border-radius', 0);
  $('.lead').css({
    'font-size': '3.5rem',
    'font-family': 'Ubuntu',
    'font-weight': 200
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


})();