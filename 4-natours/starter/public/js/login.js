/* eslint-disable */
/* 
  remember that elements will be selected according to where this js file is called
*/
import axios from 'axios';

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
    window.location.assign('/');
  } catch (err) {
    alert(err.response.data.message);
  }
};
