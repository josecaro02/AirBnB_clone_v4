$(function () {
  const amenDict = {};
  $('input.name_check').click(function () {
    if ($(this).prop('checked') === true) {
      const amenName = $(this).attr('data-name');
      const amenId = $(this).attr('data-id');
      amenDict[amenId] = amenName;
      // console.log($(this).attr('data-id'));
      const nameStr = Object.values(amenDict).join(', ');
      // console.log(nameStr);
      $('div.amenities h4').text(nameStr);
      // console.log(amenDict);
    } else if ($(this).prop('checked') === false) {
      const amenId = $(this).attr('data-id');
      delete amenDict[amenId];
      const nameStr = Object.values(amenDict).join(', ');
      $('div.amenities h4').text(nameStr);
      // console.log(amenDict);
    }
  });

  const url = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(url, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
