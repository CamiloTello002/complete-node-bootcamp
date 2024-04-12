/* eslint-disable */
const logoutButton = document.querySelector('.nav__el--logout');
logoutButton.addEventListener('click', logOut);
function logOut() {
  console.log(`The cookies are: ${document.cookie}`);
}
