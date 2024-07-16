import { activeUser } from "../landing.js";
import { elements } from "../landing.js";
import { DATA_SERVER_URI } from "../config/config.js";

const form0 = {
    onLoad: async () => {
        if(activeUser.log.form0.submitted) {
            console.log(elements.Form.elements, elements.Form.button);
            Array.from(elements.Form.elements).forEach((elem) => elem.disabled = true);
            // Array.from(elements.Form.button).forEach((btn) => btn.style.display = 'none);
            elements.Form.checkbox.checked = true;
            elements.Form.button.style.display = 'none'
        }
    },

    onSubmit: async (e) => {
        console.log("Form 0 Submitted");

        const reqData = {
            uid: activeUser.uid,
            id : activeUser.id,
            name: activeUser.name,
            username: activeUser.username,
            consent: e.target.checkbox.value == 'on'
        }

        const resp = await axios.post(`${DATA_SERVER_URI}/candidate/consent`, reqData).then(() => activeUser.log.form0.submitted = true).catch((err) => console.log('Database Connection Failed', err));
        if(resp.data == null) return false
        else return true
    }
}

export default form0