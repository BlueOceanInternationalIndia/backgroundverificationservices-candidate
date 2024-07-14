import { elements } from "../landing.js";
import page from "./page_Services.js";

const form = {
    appendData: (data) => {
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

        //Updating Elements For New DOM List
        page.updateElements('Form', '#Form');
    },

    update: async (formNum) => {
        await form.showLoading();
        await form.fetchData(formNum);

    },

    fetchData: async (formNum) => {
        await axios.get(`./forms/form${formNum}.html`).then((res) => {
            (res.data == null)? 
            console.log(`Could not fetch form${formNum} data`, res.data) : 
            form.appendData(res.data)
        }).catch((err) => console.log(`Error in connecting to form${formNum}.html`, err));
        return
    },

    showLoading: async () => {
        await axios.get(`../pages/loading.html`).then((resp) => {
            if(resp.data == null) console.log(`Could not fetch Loading data`)
            else form.appendData(resp.data);
        }).catch((err) => console.log('Error in connecting to loading.html', err));
        return
    },
}

export default form