export const ROLES = [
  { id: 1, name: "Clerk" },
  { id: 2, name: "Manager" },
  { id: 3, name: "Admin" },
  { id: 4, name: "Owner" },
  { id: 50, name: "PH Support" },
  { id: 75, name: "PH Owner" },
  { id: 99, name: "Super Admin" },
];

export const baseURL = process.env.REACT_APP_API_BASE_PATH;

export const csvFilePath = `${process.env.REACT_APP_PUBLIC_WEB_ASSETS}/product_import_template.csv`;

export function numberWithCommas(value, filter = "price") {
  let parts = value?.toString().split(".");
  if (!parts) return;
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return filter === "price" ? parts.join(".") : parts[0];
}

export const currencies = [{ id: 1, type: "USD" }];
