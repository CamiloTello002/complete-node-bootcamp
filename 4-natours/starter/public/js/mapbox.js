/* eslint-disable */

console.log('hello from the client side');

window.onload = () => {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations,
  );
  console.log(locations);
};
