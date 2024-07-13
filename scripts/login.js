import userServices from "./services/userServices.js";

// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM Loaded DOC');
// })


// window.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM Loaded');
// })

window.addEventListener('load', () => {
    const Form = document.querySelector('form');

    Form.addEventListener('submit', (e) => userServices.login(e).catch((err) => console.log('User Login Failed. Error: ', err)));
})