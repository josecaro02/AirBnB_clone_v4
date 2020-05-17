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

  const urlStatus = 'http://0.0.0.0:5001/api/v1/status/';
  $.get(urlStatus, function (data) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  const urlPlaces = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    type: 'POST',
    url: urlPlaces,
    data: JSON.stringify({}),
    contentType: 'application/json'
  })
    .done(function (places) {
      for (let i = 0; i < places.length; i++) {
        const article = document.createElement('article');

        const divTitle = document.createElement('div');

        const h2PlaceName = document.createElement('h2');
        divTitle.classList.add('title_box');
        h2PlaceName.innerHTML = places[i].name;

        const divPrice = document.createElement('div');
        divPrice.classList.add('price_by_night');
        divPrice.innerHTML = '$' + places[i].price_by_night;

        divTitle.append(h2PlaceName, divPrice);

        const divInformation = document.createElement('div');
        divInformation.classList.add('information');

        const divMaxGuest = document.createElement('div');
        divMaxGuest.classList.add('max_guest');
        const maxGuest = places[i].max_guest;
        const htmlGuest = maxGuest > 1 ? ' Guests' : ' Guest';
        divMaxGuest.innerHTML = maxGuest + htmlGuest;

        const divNumRooms = document.createElement('div');
        divNumRooms.classList.add('number_rooms');
        const numRooms = places[i].number_rooms;
        const htmlRooms = numRooms > 1 ? ' Rooms' : ' Room';
        divNumRooms.innerHTML = numRooms + htmlRooms;

        const divNumBaths = document.createElement('div');
        divNumBaths.classList.add('number_bathrooms');
        const numBaths = places[i].number_bathrooms;
        const htmlBaths = numBaths > 1 ? ' Bathrooms' : ' Bathrooms';
        divNumBaths.innerHTML = numBaths + htmlBaths;

        divInformation.append(divMaxGuest, divNumRooms, divNumBaths);

        const divDescription = document.createElement('div');
        divDescription.classList.add('description');
        divDescription.innerHTML = places[i].description;

        article.append(divTitle, divInformation, divDescription);
        $('section.places').append(article);
      }
    });
});
