/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    showAlert('success', 'Logged in successfully!');
    window.location.assign('/');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
// ================ JONAS / CAMILO WAY ================
// const form = document.querySelector('.form');

// const login = async (email, password) => {
//   axios
//     .post('/api/v1/users/login', {
//       email,
//       password,
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.error(error);
//     });
// };

// form.addEventListener('submit', async (e) => {
//   // prevents from loading any other page
//   e.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   login(email, password);
// });

// ================= ANOTHER WAY #1 (didn't work) ===============
// const form = document.querySelector('.form');

// const login = async (email, password) => {
//   const url = 'http://localhost:3000/api/v1/users/login';
//   const requestOpts = {
//     method: 'POST',
//     body: {
//       email,
//       password,
//     },
//     headers: {
//       'Content-type': 'application/json; charset=UTF=8',
//     },
//   };
//   const response = await fetch(url, requestOpts);
//   console.log(response);
// };

// form.addEventListener('submit', async (e) => {
//   // prevents from loading any other page
//   e.preventDefault();
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   login(email, password);
// });

// ====================

// ============================= ANOTHER WAY #2 (it works!!!)===========
