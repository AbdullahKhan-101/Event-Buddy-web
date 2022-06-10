// export const baseUrl = "http://54.144.168.52:3000/";
export const baseUrl = "https://api.theeventbuddy.com/";
// export const SOCKET_URL = "http://54.144.168.52:3000/";
export const SOCKET_URL = "https://api.theeventbuddy.com/";

export let socket = null;

export const setSocketRef = (params) => {
  socket = params;
};
export const imageBaseUrl = "https://event-buddy-uploads.s3.amazonaws.com/";
