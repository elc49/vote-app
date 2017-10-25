(function () {

  $('.outer').css('border-radius', 0);
  $('.lead').css({
    'font-size': '3rem',
    'font-family': 'Ubuntu',
    'font-weight': 400
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

})();