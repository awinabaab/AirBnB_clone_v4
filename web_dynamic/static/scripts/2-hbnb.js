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
});
