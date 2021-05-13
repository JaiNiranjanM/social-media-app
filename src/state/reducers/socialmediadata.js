import {
  SET_SITE_DATA,
  SET_ORGINAL_SITE_DATA,
} from "../actions/socialmediadata";

const defaultState = {
  initialSiteData: [],
  siteData: [],
};

export const socialmediaData = (state = defaultState, action) => {
  let newState = Object.assign({}, state);
  const { payload } = action;
  switch (action.type) {
    case SET_SITE_DATA:
      return { ...state, siteData: payload };
    case SET_ORGINAL_SITE_DATA:
      return { ...state, initialSiteData: payload };
    default:
      return newState;
  }
};
