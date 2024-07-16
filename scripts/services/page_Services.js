import { elements } from "../landing.js";

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
}

export default page