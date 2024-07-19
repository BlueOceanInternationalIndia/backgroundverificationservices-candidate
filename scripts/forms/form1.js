import { activeUser } from "../landing.js";
import { elements } from "../landing.js";
import { DATA_SERVER_URI } from "../config/config.js";

const form1 = {
    onLoad: async () => {
        if(activeUser.log.form1.submitted) {
           
        }
    },

    onSubmit: async (e) => {
    }
}

export default form1