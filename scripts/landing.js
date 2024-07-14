import form from './services/form_Services.js';
import page from './services/page_Services.js';
import user from './services/user_Services.js';
import onClick from './services/onCLick_Services.js';

//Elements are stored and need to updated every time DOM is manipulated
export const elements = {
    Root: null,
    FormSpace: null,
    SideNavTabs: null,
    HamMenu: null,
    UserMenu: null,
    SideNav: null,
    Form: null,
    ActiveForm: 0,
    SECTIONS: 9
}

export const activeUser = {
    uid: null,
    id: null,    
    name: null,
    username: null,
    log: {
        form0: { enabled: null, submitted: null },
        form1: { enabled: null, submitted: null, file1: null },
        form2: { enabled: null, submitted: null },
        form3: { enabled: null, submitted: null },
        form4: { enabled: null, submitted: null },
        form5: { enabled: null, submitted: null },
        form6: { enabled: null, submitted: null },
        form7: { enabled: null, submitted: null },
        form8: { enabled: null, submitted: null }            
    }
}

document.addEventListener('DOMContentLoaded', async (e) => {
    page.updateElements()

    //Setting current browser scrollbar width in CSS
    page.updateScrollWidth();
    
    //Extracting Params From URL
    const urlParams = new URLSearchParams(window.location.search);
    activeUser.uid = String(urlParams.get('uid'));
    activeUser.id = Number(urlParams.get('id'));
    activeUser.name = String(urlParams.get('name'));
    activeUser.username = String(urlParams.get('user'));
    for(const [key, value] of Object.entries(activeUser.log)) {
        const formNum = key.split('form')[1];
        value.enabled = urlParams.get(`e${formNum}`) == 'true';
        value.submitted = !(urlParams.get(`a${formNum}`) == 'true');
        (value.file1 !== undefined)? value.file1 = (urlParams.get(`${formNum}f1`) == 'true') : null;
        // console.log(key, value, value.file1 !== undefined, formNum);
    };

    //Validating Request and Updating User
    if( activeUser.uid == null || activeUser.id == null || activeUser.name == null || 
        activeUser.uid == 'null' || activeUser.id == 'null' || activeUser.name == 'null' ||
        activeUser.uid === '' || activeUser.id === '' || activeUser.name === '') {
        console.log("Invalid User");
        window.location.href = ("../index.html?valid=false");
    } else {
        console.log("Valid Request, User Updated");
        const User = document.querySelector('#CandidateName');
        User.innerText = activeUser.name.toString();
    }

    //Validating Enabled Forms and Updating Active Form
    for(const [key, value] of Object.entries(activeUser.log)) {
        elements.SideNavTabs[Number(key.split('form')[1])].dataset.enabled = value.enabled;
        if(value.enabled == true && value.submitted == false) elements.ActiveForm = Number(key.split('form')[1]);    
    }

    await form.showLoading();
    await user.loginValidate();
    await form.update(elements.ActiveForm);
})


window.addEventListener('load', (e) => {

    //Detecting Form Submit
    elements.FormSpace.addEventListener('submit', (e) => {
        e.preventDefault();
        // console.log('FORM SUBMITTED', e);
    })

    //Detecting Active Menu
    elements.HamMenu.addEventListener("click", () => onClick.hamMenu());
    elements.UserMenu.addEventListener("click", () => onClick.userMenu());

    for(let i = 0; i < elements.SideNavTabs.length; i++) elements.SideNavTabs[i].addEventListener("click", () => onClick.navMenuTabs(i));
    // for(let i = 0; i < elements.UserMenuTab.length; i++) elements.UserMenuTab[i].addEventListener("click", () => onClick.userMenuTabs(i));

})

