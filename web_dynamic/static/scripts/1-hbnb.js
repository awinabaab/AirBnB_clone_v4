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
});
