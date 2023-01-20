/* eslint-disable no-undef */
export const frontendUrl = window.location.origin;
const url = new URL(window.location.href);
let localBackend = "//" + url.hostname + "/mtn/developments/laravel/backend";

const remoteBackend =
  SERVER === "production" || SERVER === "staging"
    ? "/backend"
    : SERVER === "testing"
    ? "//dev.princemorpheus.net/mtnnfmap/backend"
    : localBackend;

export const backendURL =
  process.env.NODE_ENV === "production" ? remoteBackend : localBackend;

export default {
  title: "MTNN Foundation Map",
  slug: "mtnnfmap",
  debug: true,
  frontendUrl: frontendUrl,
  backendURL: backendURL,
  apiURL: backendURL + "/public/api",
  uploadURL: backendURL + "/storage",
  iconURL: backendURL + "/storage/app/public/images/icons/",
  bannerURL: `${backendURL}/storage/app/public/images/banners/less/`,
  thumbnailURL: `${backendURL}/storage/app/public/images/banners/thumbnail/`,
  adminUrl: ADMINURL,
};
