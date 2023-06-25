const { ROLES } = require("../helpers/constants");

export const ALL_MERCHANTS_ID = 0;

export const ROWS_PER_PAGE = 20;

export const Roles = {
  RoleNone: 0,
  RoleUser: 1,
  RoleManager: 2,
  RoleAdmin: 3,
  RoleOwner: 4,
  RolePHSupport: 50,
  RolePHOwner: 75,
  RoleSuperAdmin: 99,
};

export const findRole = (roleId) => {
  const role = ROLES.find((role) => role.id === roleId);
  return (role && role.name) || "";
};

// To check if a string is a valid JSON
export const IsJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const convertTextToDate = (dateText) => {
  //yyyymmddhhmmss
  const year = dateText.substr("0", "4");
  const month = dateText.substr("4", "2");
  const day = dateText.substr("6", "2");
  const hour = dateText.substr("8", "2");
  const minutes = dateText.substr("10", "2");
  const seconds = dateText.substr("12", "2");
  return (
    month + "/" + day + "/" + year + " " + hour + ":" + minutes + ":" + seconds
  );
};

// Create our number formatter.
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
