import user from './services/user_Services.js';
const urlParams = new URLSearchParams(window.location.search),
    valid = String(urlParams.get('valid'));

window.addEventListener('load', async () => {
    (valid == 'false')? user.logout() : null;
    const iframe = document.querySelector('#Frame');
    //Validating User
    const activeUser = await user.validate();
    (activeUser.valid)? 
        iframe.src = `./pages/landing.html?uid=${activeUser.user.uid}&id=${activeUser.user.id}&name=${activeUser.user.name}&email=${activeUser.user.email}&user=${activeUser.user.username}` : 
        iframe.src = './pages/login.html';
});


