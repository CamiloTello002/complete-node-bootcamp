/* eslint-disable */
import '@babel/polyfill';
import { login } from './submit';

// DOM ELEMENTS
const loginForm = document.querySelector('.form');

// VALUES
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  login(email, password);
});
