// export const baseUrl = "http://54.144.168.52:3000/";
export const baseUrl = "http://api.theeventbuddy.com/";
export const SOCKET_URL = "http://api.theeventbuddy.com/";
const actorId = "64";
const authToken = "fa1411c4-ac3e-4f96-8692-d3279177e296";
export let socket = null;

export const setSocketRef = (params) => {
  socket = params;
};
export const imageBaseUrl = "https://event-buddy-uploads.s3.amazonaws.com/";
