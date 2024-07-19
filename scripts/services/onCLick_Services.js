import user from "./user_Services.js";
import form from "./form_Services.js";
import { elements } from "../landing.js";
import form0 from "../forms/form0.js";

const onClick = {
    hamMenu: () => {
        user.loginValidate();
        if(elements.HamMenu.dataset.status != "active") {
            elements.HamMenu.dataset.status = "active";
            elements.SideNav.dataset.status = "active"
        } else {
            elements.HamMenu.dataset.status = "inactive";
            elements.SideNav.dataset.status = "inactive"
        }
    },

    userMenu: () => {
        user.loginValidate();
        if(elements.UserMenu.dataset.status != "active") elements.UserMenu.dataset.status = "active";
        else elements.UserMenu.dataset.status = "inactive";
        return true
    },

    navMenuTabs: (activeTab) => {
        user.loginValidate();
        if(elements.SideNavTabs[activeTab].dataset.enabled == "false") return false;

        // Add below code in initialization too
        Object.keys(elements.SideNavTabs).forEach((key) => (elements.SideNavTabs[key].dataset.status == 'active')? elements.SideNavTabs[key].dataset.status == 'inactive' : null )
        elements.SideNavTabs[activeTab].dataset.status = "active";

        document.querySelector('#FormHeading').innerText = `Candidate Form > Section ${activeTab+1} of ${elements.SECTIONS}`;
        elements.FormSpace.dataset.id = activeTab;
        form.update(activeTab);

        elements.ActiveForm = activeTab;
        elements.HamMenu.dataset.status = "inactive";
        elements.SideNav.dataset.status = "inactive";
        return true
    },

    userMenuTabs: (activeTab) => {
        user.loginValidate();
        switch(activeTab) {
            case 0: 
                break;
            case 1: 
                break;
            case 2: 
                user.logout();
                break;
        }
    }
}

export default onClick