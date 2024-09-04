import api from '@/api/api';

export function logout() {
  api
    .post('v1/api/auth/logout', {
      accessToken: localStorage.getItem('token'),
    })
    .then(() => {
      localStorage.removeItem('token');
      window.location.replace('/');
    })
    .catch(() => {
      localStorage.removeItem('token');
      window.location.replace('/');
    });
}
