/* eslint-disable */
/* 
  remember that elements will be selected according to where this js file is called
*/
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
    showAlert('success', 'successfully logged in :)');
    window.location.assign('/');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
