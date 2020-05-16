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
});
