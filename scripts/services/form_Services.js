import { elements } from "../landing.js";
import page from "./page_Services.js";
import user from "./user_Services.js";
import form0 from '../forms/form0.js'

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
            // case 1: return form1.onLoad();
            // case 2: return form2.onLoad();
            // case 3: return form3.onLoad();
            // case 4: return form4.onLoad();
            // case 5: return form5.onLoad();
            // case 6: return form6.onLoad();
            // case 7: return form7.onLoad();
            // case 8: return form8.onLoad();
            default: console.log('Invalid Form, Cannot Load');
        }
    },

    onSubmit: async (e) => {
        e.preventDefault();
        await user.loginValidate();
        switch(elements.ActiveForm) {
            case 0: return await form0.onSubmit(e);
            // case 1: return await form1.onSubmit(e);
            // case 2: return await form2.onSubmit(e);
            // case 3: return await form3.onSubmit(e);
            // case 4: return await form4.onSubmit(e);
            // case 5: return await form5.onSubmit(e);
            // case 6: return await form6.onSubmit(e);
            // case 7: return await form7.onSubmit(e);
            // case 8: return await form8.onSubmit(e);
            default: console.log('Invalid Form, Cannot Submit');
        }
        return resp;
    }
}

export default form