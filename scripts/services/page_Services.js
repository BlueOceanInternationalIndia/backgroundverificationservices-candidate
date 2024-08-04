import { elements, activeUser } from "../landing.js";

const page = {
    updateElements: async (elem, query) => {
        try {
            if(elem == null) {
                elements.Root = document.querySelector(':root');
                elements.FormSpace = document.querySelector('#FormSpace');
                elements.SideNavTabs = document.querySelectorAll('.sideNavTab');
                elements.HamMenu = document.querySelector('.hamMenu');
                elements.UserProfileBtn = document.querySelector('#ProfileImage');
                elements.UserMenu = document.querySelector('#UserMenu');
                elements.SideNav = document.querySelector('.sideNav');
                elements.Form = elements.FormSpace.querySelector('#Form');
            } else for(const [key, value] of Object.entries(elements)) if(key == elem) elements[key] = document.querySelector(query);
            return true
        } catch(err) {
            console.log('Error Updating DOM Elements. Error:', err);
            return false
        }
    },

    updateScrollWidth: () => {
        const tempElem = document.createElement('div') ;
        tempElem.style.cssText = "overflow:scroll; visibility:hidden; position:absolute;"
        document.body.appendChild(tempElem);
        const width = tempElem.offsetWidth - tempElem.clientWidth;
        tempElem.remove();

        elements.Root.style.setProperty('--scrollBarWidth', `${width}px`);
    },

    updateActiveForms: () => {
        for(const [key, value] of Object.entries(activeUser.log)) {
            elements.SideNavTabs[Number(key.split('form')[1])].dataset.enabled = value.enabled;
            if(value.enabled == true && value.submitted == false && elements.ActiveForm === null) elements.ActiveForm =  Number(key.split('form')[1]);    
        }
        if(elements.ActiveForm === null) {
            elements.ActiveForm = 0;
        }
        return elements.ActiveForm;
    }
}

export default page