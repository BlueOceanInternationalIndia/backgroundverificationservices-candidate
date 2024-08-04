import { activeUser } from "../landing.js";
import { elements } from "../landing.js";
import { DATA_SERVER_URI } from "../config/config.js";
import user from "../services/user_Services.js";

const form0 = {
    onSubmit: async () => {
        const aTr = await user.accessValidate();

        const reqData = {
            uid: activeUser.uid,
            id : activeUser.id,
            name: activeUser.name,
            username: activeUser.username,
            consent: elements.FormData.consent,
            token: aTr
        }

        const resp = await axios.post(`${DATA_SERVER_URI}/candidate/consent`, reqData).then(() => activeUser.log.form0.submitted = true).catch((err) => console.log('Database Connection Failed', err));
        return resp
    }
}

export default form0