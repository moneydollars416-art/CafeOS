export const ADMIN_EMAILS = [
  "moneydollars416@gmail.com",
  "alish@gmail.com"
];

export function isAdmin(user) {
  return Boolean(user) && ADMIN_EMAILS.includes(user.name.trim().toLowerCase());
}