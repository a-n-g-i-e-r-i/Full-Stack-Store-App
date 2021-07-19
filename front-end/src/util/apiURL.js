export const apiURL = () => {
  return window.location.hostname === "localhost"
    ? "http://localhost:3333"
    : "https://agile-hollows-99573.herokuapp.com";
};
