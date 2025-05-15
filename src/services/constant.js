const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  GET_USER: `/api/auth/user/get`,
  SAVE_LOCATION: `/api/location/save`,
  GET_LOCATIONS: `/api/location/get`,
  DELETE_LOCATION: `/api/location/delete`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
};
