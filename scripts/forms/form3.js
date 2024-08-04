import { activeUser } from "../landing.js";
import { elements } from "../landing.js";
import { DATA_SERVER_URI } from "../config/config.js";
import user from "../services/user_Services.js";

const form3 = {
    onChecked: async (e) => {
        if(e.target.id != 'Checkbox') return false

        if(e.target.checked == true) {
            const elems = elements.Form.elements;
            for(let i = 19; i < 35; i++) {
                elems[i].disabled = true;
                if(elems[i].type == 'radio') elems[i].checked = elems[i-17].checked
                else elems[i].value = elems[i - 17].value
            }
        } else {
            const elems = elements.Form.elements;
            for(let i = 19; i < 35; i++) {
                elems[i].disabled = false;
                if(elems[i].type == 'radio') elems[i].checked = false
                else elems[i].value = '';
            }
        }
        
    },

    onSubmit: async () => {
        const aTr = await user.accessValidate();
        const userData = {
            uid: activeUser.uid,
            id : activeUser.id,
            name: activeUser.name,
            username: activeUser.username,
            currAddress1: elements.FormData.currAddress1,
            currAddress2: elements.FormData.currAddress2,
            currLandmark: elements.FormData.currLandmark,
            currCity: elements.FormData.currCity,
            currDistrict: elements.FormData.currDistrict,
            currState: elements.FormData.currState,
            currPincode: elements.FormData.currPincode,
            currSince: new Date(elements.FormData.currSince),
            currPost: elements.FormData.currPost,
            currPolice: elements.FormData.currPolice,
            currOwner: elements.FormData.currOwner,
            currType: elements.FormData.currType,
            checkbox: elements.FormData.checkbox,
            perAddress1: (elements.FormData.checkbox === 'on')? elements.FormData.currAddress1 : elements.FormData.perAddress1,
            perAddress2: (elements.FormData.checkbox === 'on')? elements.FormData.currAddress2 : elements.FormData.perAddress2,
            perLandmark: (elements.FormData.checkbox === 'on')? elements.FormData.currLandmark : elements.FormData.perLandmark,
            perCity: (elements.FormData.checkbox === 'on')? elements.FormData.currCity : elements.FormData.perCity,
            perDistrict: (elements.FormData.checkbox === 'on')? elements.FormData.currDistrict : elements.FormData.perDistrict,
            perState: (elements.FormData.checkbox === 'on')? elements.FormData.currState : elements.FormData.perState,
            perPincode: (elements.FormData.checkbox === 'on')? elements.FormData.currPincode : elements.FormData.perPincode,
            perSince: (elements.FormData.checkbox === 'on')? new Date(elements.FormData.currSince) : new Date(elements.FormData.perSince),
            perPost: (elements.FormData.checkbox === 'on')? elements.FormData.currPost : elements.FormData.perPost,
            perPolice: (elements.FormData.checkbox === 'on')? elements.FormData.currPolice : elements.FormData.perPolice,
            perOwner: (elements.FormData.checkbox === 'on')? elements.FormData.currOwner : elements.FormData.perOwner,
            perType: (elements.FormData.checkbox === 'on')? elements.FormData.currType : elements.FormData.perType,
            token: aTr
        }
        
        const resp = await axios.post(`${DATA_SERVER_URI}/candidate/addressdetails`, userData).then((res) => {
            activeUser.log.form3.submitted = true;
            return true;
        }).catch((err) => console.log('Database Connection Failed', err));
        
        return resp;
    }
}

export default form3