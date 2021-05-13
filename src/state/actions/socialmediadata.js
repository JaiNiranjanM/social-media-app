export const SET_SITE_DATA = "SET_SITE_DATA";
export const SET_ORGINAL_SITE_DATA = "SET_ORGINAL_SITE_DATA";

export const setSiteData = (siteData) => ({
  type: SET_SITE_DATA,
  payload: siteData,
});

export const setInitialSiteData = (initialSiteData) => ({
  type: SET_ORGINAL_SITE_DATA,
  payload: initialSiteData,
});
