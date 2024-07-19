import { activeUser } from "../landing.js";
import { elements } from "../landing.js";
import { DATA_SERVER_URI } from "../config/config.js";
import user from "../services/user_Services.js";

const form0 = {
    onLoad: async () => {
        if(activeUser.log.form0.submitted) {
            Array.from(elements.Form.elements).forEach((elem) => elem.disabled = true);
            elements.Form.checkbox.checked = true;
            elements.Form.button.style.display = 'none'
        }
    },

    onSubmit: async (e) => {
        const aTr = await user.accessValidate();
        const reqData = {
            uid: activeUser.uid,
            id : activeUser.id,
            name: activeUser.name,
            username: activeUser.username,
            consent: e.target.checkbox.value == 'on',
            token: aTr
        }
        return await axios.post(`${DATA_SERVER_URI}/candidate/consent`, reqData).then(() => activeUser.log.form0.submitted = true).catch((err) => console.log('Database Connection Failed', err));
    }
}

export default form0