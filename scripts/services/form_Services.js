import { elements } from "../landing.js";
import page from "./page_Services.js";
import user from "./user_Services.js";
import form0 from '../forms/form0.js'
import form1 from '../forms/form1.js'
import onClick from "./onCLick_Services.js";

const form = {
    appendData: async (data) => {
        //Clearing Form Space
        const FormSpace = elements.FormSpace.children[0].children[0]
        FormSpace.children[0]?.remove();

        //Creating New Form
        const FormData = document.createElement('form');
        FormData.classList.add('mainContainer');
        FormData.id = 'Form';
        FormData.innerHTML = data;

        //Appending New Form
        elements.FormSpace.children[0].children[0].appendChild(FormData);
    },

    update: async (formNum) => {
        await form.showLoading();
        const pageData = await form.fetchData(formNum);
        await form.appendData(pageData);
        //Updating Elements For New DOM List
        await page.updateElements('Form', '#Form');
        await form.onLoad(formNum);
    },

    fetchData: async (formNum) => {
        const pageData = await axios.get(`./forms/form${formNum}.html`).then((res) => {
            if(res.data == null) console.log(`Could not fetch form${formNum} data`, res.data);
            else return res.data
        }).catch((err) => console.log(`Error in connecting to form${formNum}.html`, err));
        
        return pageData
    },

    showLoading: async () => {
        await axios.get(`../pages/loading.html`).then((resp) => {
            if(resp.data == null) console.log(`Could not fetch Loading data`)
            else form.appendData(resp.data);
        }).catch((err) => console.log('Error in connecting to loading.html', err));
        return
    },

    onLoad: async (formNum) => {
        switch(formNum) {
            case 0: return form0.onLoad();
            case 1: return form1.onLoad();
            default: console.log('Invalid Form, Cannot Load');
        }
    },

    onSubmit: async (e) => {
        e.preventDefault();
        await user.loginValidate();

        elements.FormData = e;
        elements.PopUp = e.target.querySelector('.popUp');
        elements.PopUpSubmitBtn = e.target.submit,
        elements.PopUpCancelBtn = e.target.cancel;

        elements.PopUp.style.display = 'grid';
        var submitClick = null, cancelClick = null;
        elements.PopUpSubmitBtn.addEventListener('click', submitClick = () =>  form.onSubmitConfirm(submitClick, cancelClick))
        elements.PopUpCancelBtn.addEventListener('click', cancelClick = () => form.onSubmitCancel(submitClick, cancelClick))
    },

    onSubmitConfirm: async (submitFn, cancelFn) => {
        elements.PopUpSubmitBtn.removeEventListener('click', submitFn);
        elements.PopUpCancelBtn.removeEventListener('click', cancelFn);
        const PopUpLoader = elements.PopUp.querySelector('.popUp');
        PopUpLoader.style.display = 'grid';
        (elements.ActiveForm == 0)? ((await form0.onSubmit(elements.FormData))? onClick.navMenuTabs(1) : console.log('Error Submitting Form')) : 
        (elements.ActiveForm == 1)? ((await form1.onSubmit(elements.FormData))? onClick.navMenuTabs(2) : console.log('Error Submitting Form')) : 
       console.log('Invalid Form');
       
        PopUpLoader.style.display = 'none'
        elements.PopUp.style.display = 'none';
        elements.FormData = null;
        elements.PopUp = null;
        elements.PopUpSubmitBtn = null,
        elements.PopUpCancelBtn = null;
        return
    },

    onSubmitCancel: async (submitFn, cancelFn) => {
        elements.PopUp.style.display = 'none';
        elements.PopUpSubmitBtn.removeEventListener('click', submitFn);
        elements.PopUpCancelBtn.removeEventListener('click', cancelFn);

        elements.FormData = null;
        elements.PopUp = null;
        elements.PopUpSubmitBtn = null,
        elements.PopUpCancelBtn = null;
    }

}

export default form