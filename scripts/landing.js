import form from './services/form_Services.js';
import page from './services/page_Services.js';
import onClick from './services/onCLick_Services.js';

//Elements are stored and need to updated every time DOM is manipulated
export const elements = {
    Root: null,
    FormSpace: null,
    SideNav: null,
    SideNavTabs: null,
    HamMenu: null,
    UserProfileBtn: null,
    UserMenu: null,
    Form: null,
    FormData: null,
    PopUp: null,
    PopUpSubmitBtn: null,
    PopUpCancelBtn: null,
    ActiveForm: null,
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
        form8: { enabled: null, submitted: null },            
        form9: { enabled: null, submitted: null }            
    }
}

document.addEventListener('DOMContentLoaded', async (e) => {
    await page.updateElements()

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
    };

    //Validating Request and Updating User
    if( activeUser.uid == null || activeUser.id == null || activeUser.name == null || 
        activeUser.uid == 'null' || activeUser.id == 'null' || activeUser.name == 'null' ||
        activeUser.uid === '' || activeUser.id === '' || activeUser.name === '') {
        console.log("Invalid User");
        window.location.href = ("../index.html?valid=false");
    } else {
        const User = document.querySelector('#CandidateName');
        User.innerText = activeUser.name.toString();
    }

    //Validating Enabled Forms and Updating Active Form
    await page.updateActiveForms();
    await form.showLoading();
    await onClick.navMenuTabs(elements.ActiveForm);
})


window.addEventListener('load', (e) => {
    //Detecting Form Submit And Updating ActiveForm If Form Submitted
    elements.FormSpace.addEventListener('submit', async (e) => await form.onSubmit(e));

    //Detecting Checkboxes
    elements.FormSpace.addEventListener('input', async (e) => (e.target.type == 'checkbox')? await form.onChecked(e) : null);
    
    //Detecting Checkboxes
    elements.FormSpace.addEventListener('click', async (e) => (e.target.classList.value == 'actionButton')? await form.onAction(e) : null);
    

    //Detecting Active Menu
    elements.HamMenu.addEventListener("click", () => onClick.hamMenu());
    elements.UserProfileBtn.addEventListener("click", () => onClick.userMenu());
    for(let i = 0; i < elements.SideNavTabs.length; i++) elements.SideNavTabs[i].addEventListener("click", () => onClick.navMenuTabs(i));
    for(let i = 0; i < elements.UserMenu.children[0].children.length; i++) elements.UserMenu.children[0].children[i].addEventListener("click", () => onClick.userMenuTabs(i));

})

window.addEventListener('resize', () => {
    page.updateScrollWidth();
})