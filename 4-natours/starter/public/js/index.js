/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { updateData } from './updateSettings';

// DOM ELEMENTS
const loginForm = document.querySelector('.form--login');
const logoutButton = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');

// DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    // prevents the form from being submitted
    e.preventDefault();
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    updateData(name, email);
  });
}
