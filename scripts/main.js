import userServices from './services/userServices.js';

window.addEventListener('load', async () => {
    const iframe = document.querySelector('#Frame');

    //Validating User
    const activeUser = await userServices.userValidate();
    // console.log('ValidUser = ', activeUser);
    
    if(activeUser.valid == false) {
        iframe.src = './pages/login.html';
    } else {
        iframe.src = `./pages/landing.html?uid=${activeUser.user.uid}&id=${activeUser.user.id}&name=${activeUser.user.name}&email=${activeUser.user.email}&user=${activeUser.user.username}`;
        // iframe.src = './pages/landing.html';
    }
});


