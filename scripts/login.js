import userServices from "./services/user_Services.js";

window.addEventListener('load', () => document.querySelector('form').addEventListener('submit', (e) => userServices.login(e).catch((err) => console.log('User Login Failed. Error: ', err))))