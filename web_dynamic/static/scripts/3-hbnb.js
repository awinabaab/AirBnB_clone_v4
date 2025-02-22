$(document).ready(() => {
  const input = $('INPUT');
  const amenityList = {};

  input.click((e) => {
    const dataId = e.target.attributes['data-id'].value;
    const dataName = e.target.attributes['data-name'].value;

    if (Object.keys(amenityList).includes(dataName)) {
      delete amenityList[dataName];
    } else amenityList[dataName] = dataId;

    const displaySelected = $('DIV.amenities h4');
    displaySelected.text(Object.keys(amenityList).join(', '));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', res => {
    const apiStatus = $('DIV#api_status');

    if (res.status === 'OK') {
      apiStatus.addClass('available');
    } else apiStatus.removeClass('available');
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: res => {
      const placesSection = $('SECTION.places');

      res.forEach((place, idx) => {
        placesSection.append(
        `<article>
         <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
         </div>
         <div class="information">
            <div class="max_guest">${place.max_guest} Guests</div>
            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
         </div>
         <div class="description">
            ${place.description}
         </div>
       </article>`
        );
      });
    }
  });
});
