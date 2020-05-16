$(function () {
  const amenDict = {};
  $('input.check_amenity').click(function () {
    if ($(this).prop('checked') === true) {
      const amenName = $(this).attr('data-name');
      const amenId = $(this).attr('data-id');
      amenDict[amenId] = amenName;
      const nameStr = Object.values(amenDict).join(', ');
      $('div.amenities h4').text(nameStr);
    } else if ($(this).prop('checked') === false) {
      const amenId = $(this).attr('data-id');
      delete amenDict[amenId];
      const nameStr = Object.values(amenDict).join(', ');
      $('div.amenities h4').text(nameStr);
    }
  });

  const url_status = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url_status, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });


  const url_places = 'http://0.0.0.0:5001/api/v1/places_search';
  $.ajax({
    type: 'POST',
    url: url_places,
    data: {},
    contentType:"application/json; charset=uft-8",
    success: function () {
      console.log('funciona');
    }
  });
});
