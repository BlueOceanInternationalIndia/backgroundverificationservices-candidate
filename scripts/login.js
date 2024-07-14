import userServices from "./services/user_Services.js";

window.addEventListener('load', () => {
    const Form = document.querySelector('form');

    Form.addEventListener('submit', (e) => userServices.login(e).catch((err) => console.log('User Login Failed. Error: ', err)));
})