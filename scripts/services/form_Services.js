import { activeUser, elements } from "../landing.js";
import page from "./page_Services.js";
import user from "./user_Services.js";
import onClick from "./onCLick_Services.js";
import { DATA_SERVER_URI } from "../config/config.js";
import form0 from '../forms/form0.js'
import form1 from '../forms/form1.js'
import form2 from '../forms/form2.js'
import form3 from '../forms/form3.js'
import form7 from '../forms/form7.js'
import form8 from '../forms/form8.js'
import form9 from '../forms/form9.js'

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
        if(activeUser.log[`form${formNum}`].submitted == true) {
            if(formNum == 7) form7.onLoad()
            else if(formNum == 8) form8.onLoad()
            else if(formNum == 9) form9.onLoad()
            else {
                for(const element of elements.Form.elements) element.disabled = true;
                const aTr = await user.accessValidate();
                let resp =null;
    
                (formNum == 0)? resp = await axios.post(`${DATA_SERVER_URI}/candidate/consent/${activeUser.uid}`, { token: aTr }).catch((err) => console.log('Cannot Connect To Consent Database. Error: ', err)):
                (formNum == 2)? resp = await axios.post(`${DATA_SERVER_URI}/candidate/personaldetails/${activeUser.uid}`, { token: aTr }).catch((err) => console.log('Cannot Connect To PD Database. Error: ', err)):
                (formNum == 3)? resp = await axios.post(`${DATA_SERVER_URI}/candidate/addressdetails/${activeUser.uid}`, { token: aTr }).catch((err) => console.log('Cannot Connect To AD Database. Error: ', err)):
                console.log('Invalid Form Loaded');
    
                const respData = resp.data.data;
                for(const element of elements.Form.elements) {
                    (element.tagName.toLowerCase() == 'input' || element.tagName.toLowerCase() == 'select')?
                        (element.type == 'date')? element.value = respData[element.name].split('T')[0] :
                        (element.type == 'month')? element.value = respData[element.name].split('-01T')[0]: 
                        (element.type == 'radio')? element.checked = (element.value == respData[element.name]) :
                        (element.type == 'checkbox')? element.checked = (element.value == respData[element.name]) :
                        (element.type == 'tel')? element.value = respData[element.name].split(' ')[1] :
                        (element.className == 'mobileCountryCodes')? element.value = respData[element.name.split('Code')[0]].split(' ')[0] : 
                        element.value = respData[element.name]
                    : null;
                }
            }
        }
    },

    onChecked: async (e) => {
        switch(elements.ActiveForm) {
            case 3: return form3.onChecked(e);
            default: console.log('Invalid Form, Cannot Load Checked');
        }
    },

    onAction: async (e) => {
        (elements.ActiveForm == 7)? (form7.onAction(e))? onClick.navMenuTabs(7) : console.log('Error Submitting Form') : null;
        (elements.ActiveForm == 8)? (form8.onAction(e))? onClick.navMenuTabs(8) : console.log('Error Submitting Form') : null;
        (elements.ActiveForm == 9)? (form9.onAction(e))? onClick.navMenuTabs(9) : console.log('Error Submitting Form') : null;
    },

    onSubmit: async (e) => {
        e.preventDefault();
        const Message = document.querySelector('.message');
        (Message.style.visibility == 'visible')? Message.style.visibility = 'hidden' : null;

        await user.loginValidate();

        if(!form.submitValidate(e)) {
            console.log('Invalid Input'); 
            Message.style.color = 'red';
            Message.style.visibility = 'visible'
            return false;
        }

        const formData = new FormData(e.target), 
            formDataObj = {};
        for (const [key, value] of formData) formDataObj[key] = value;

        elements.FormData = formDataObj;
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
        let submitted = null;
        (elements.ActiveForm == 0)? submitted = await form0.onSubmit(elements.FormData) : 
        (elements.ActiveForm == 1)? submitted = await form1.onSubmit(elements.FormData) : 
        (elements.ActiveForm == 2)? submitted = await form2.onSubmit(elements.FormData) : 
        (elements.ActiveForm == 3)? submitted = await form3.onSubmit(elements.FormData) : 
        (elements.ActiveForm == 7)? submitted = await form7.onSubmit(elements.FormData) : 
        (elements.ActiveForm == 8)? submitted = await form8.onSubmit(elements.FormData) : 
        (elements.ActiveForm == 9)? submitted = await form9.onSubmit(elements.FormData) : 
        console.log('Invalid Form');

        (submitted == true)? onClick.navMenuTabs(page.updateActiveForms()) : console.log('Error Submitting Form');
        
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
    },

    submitValidate(e) {
        for(let i = 0; i < e.target.elements.length; i++) if((e.target.elements[i].tagName.toLowerCase() == 'input' || e.target.elements[i].tagName.toLowerCase() == 'select')&&(e.target.elements[i].value === '' || e.target.elements[i].value == undefined || e.target.elements[i].value == 'Select' || (e.target.elements[i].tagName.toLowerCase() == 'select' && e.target.elements[i].value === 'None'))) return false
        if(elements.Form.dataset.id == 2 && document.querySelector('#Email').value == document.querySelector('#AltEmail').value) return false
        return true
    }

}

export default form