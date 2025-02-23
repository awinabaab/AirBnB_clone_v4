$(document).ready(() => {
  const amenityInput = $('INPUT.amenity');
  const cityInput = $('INPUT.city');
  const stateInput = $('INPUT.state');
  const amenityList = {};
  const cityList = {};
  const stateList = {};

  amenityInput.click((e) => {
    const dataId = e.target.attributes['data-id'].value;
    const dataName = e.target.attributes['data-name'].value;

    if (Object.keys(amenityList).includes(dataName)) {
      delete amenityList[dataName];
    } else amenityList[dataName] = dataId;

    const displaySelected = $('DIV.amenities h4');
    displaySelected.text(Object.keys(amenityList).join(', '));
  });

  cityInput.click((e) => {
    const dataId = e.target.attributes['data-id'].value;
    const dataName = e.target.attributes['data-name'].value;

    if (Object.keys(cityList).includes(dataName)) {
      delete cityList[dataName];
    } else cityList[dataName] = dataId;

    const displaySelected = $('DIV.locations h4');
    displaySelected.text(Object.keys(cityList).join(', '));
  });

  stateInput.click((e) => {
    const dataId = e.target.attributes['data-id'].value;
    const dataName = e.target.attributes['data-name'].value;

    if (Object.keys(stateList).includes(dataName)) {
      delete stateList[dataName];
    } else stateList[dataName] = dataId;
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', res => {
    const apiStatus = $('DIV#api_status');

    if (res.status === 'OK') {
      apiStatus.addClass('available');
    } else apiStatus.removeClass('available');
  });

  function renderReviews (placeId) {
    $.get(`http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`, reviews => {
      const reviewsDiv = $(`DIV.reviews ul#${placeId}`);

      reviews.forEach(review => {
        reviewsDiv.append(`
        <li>
            <p>${review.text}</p>
        </li>`
        );
      });
    });
  }

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
         <div class=reviews>
           <h2>Reviews</h2><span id="${place.id}" class="toggle_reviews">show</span>
            <ul id="${place.id}">
            </ul>
         </div>
       </article>`
        );
      });
    }
  });

  const searchButton = $('BUTTON#search_button');

  searchButton.click(() => {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        amenities: Object.values(amenityList),
        states: Object.values(stateList),
        cities: Object.values(cityList)
      }),
      success: res => {
        const placesSection = $('SECTION.places');

        placesSection.empty();

        res.forEach(place => {
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
           <div class=reviews>
           <h2>Reviews</h2><span class="toggle_reviews" id="${place.id}">show</span>
           <ul id="${place.id}>
               </ul>
           </div>
         </article>`
          );
        });
      }
    });
  });

  $(document).on('click', 'SPAN.toggle_reviews', e => {
    const targetId = e.target.attributes.id.value;
    const reviewsDiv = $(`ul#${targetId}`);

    if (e.target.textContent === 'show') {
      renderReviews(targetId);
      e.target.textContent = 'hide';
    } else {
      reviewsDiv.empty();
      e.target.textContent = 'show';
    }
  });
});
